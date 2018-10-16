import fetch from "isomorphic-fetch"
import PackageCard from "../components/PackageCard"
import SearchBar from "../components/SearchBar"
import Link from 'next/link'

const Search = props => (
    <div>
        <p>(<Link href="/"><a>home</a></Link>) Search results:</p>
        <SearchBar />
        {
            props.packages.length ? 
                props.packages.map(pkg => (
                    <PackageCard pkg={pkg} key={props.packages.indexOf(pkg)}/>
                ))
            :
                <p>no results :v</p>
        }
        <style jsx global>{`
            * {
                font-family: Roboto;
            }
        `}</style>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
    </div>
)

Search.getInitialProps = async ctx => {

    const {q} = ctx.query
    if (!q)
        return {packages: []}
    const response = await (await fetch("https://www.npmjs.com/search/suggestions?q="+q)).json()
    const list = response.map(x => x.name)

    let prevMonth = formatDate(new Date(new Date().getTime() - 1000*60*60*24*30))
    let prevMonth2 = formatDate(new Date(new Date().getTime() - 2*1000*60*60*24*30))

    let packages = [];
    for (let i = 0; i < list.length; i++) {
        const pkg = list[i];
        const downloads_thisM =  (await (await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`)).json()).downloads
        const downloads_prevM = (await (await fetch(`https://api.npmjs.org/downloads/point/${prevMonth2}:${prevMonth}/${pkg}`)).json()).downloads

        packages.push({
            name: pkg,
            downloads_thisM,
            downloads_prevM,
            increase: Math.round((downloads_thisM / downloads_prevM)*100-100)
        })
    }

    function formatDate(d) {
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }

    return {packages}

}

export default Search