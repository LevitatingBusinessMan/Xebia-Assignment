import fetch from "isomorphic-fetch"
import PackageCard from "../components/PackageCard"
import SearchBar from "../components/SearchBar"

const Index = props => (
    <div>
        <h1 className="title">Monthly download increasement of most popular NPM packages:</h1>
        <SearchBar />
        <div className="top5-container">
            <h1>Top 6</h1>
            <div className="card-container">{
                props.packages.sort((a,b) => b.increase - a.increase).slice(0,6).map(pkg => (
                    <PackageCard pkg={pkg} key={props.packages.indexOf(pkg)}/>
                ))
            }</div>
        </div>
        <h1 className="more">More</h1>
        {
            props.packages.sort((a,b) => b.increase - a.increase).slice(5).map(pkg => (
                <PackageCard pkg={pkg} key={props.packages.indexOf(pkg)}/>
            ))
        }
        <style jsx global>{`
            * {
                font-family: Roboto;
            }
            .top5-container {
                background-color: #99ccff;
                padding: 5px 30px;
                margin: 20px;
                border-radius: 10px;
            }
            .top5-container .card-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            .top5-container h1 {
                text-align: center;
                width: 100%;
                display: block;
            }
            .title {
                line-height: 10px;
            }
            .more {
                margin-left: 10px;
            }
        `}</style>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
    </div>
)

Index.getInitialProps = async ctx => {
    
    if (ctx.req) var host = ctx.req.headers.host
    else var host = window.location.host

    const list = await (await fetch(`http://${host}/api/getMostUsed`)).json()

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

export default Index