const PackageCard = ({pkg}) => (
   <div>
       <div className="card">
            <a className="name" href={`https://www.npmjs.com/package/${pkg.name}`}>{pkg.name}</a>
            <p>downloads: <span className={pkg.increase >= 0 ? "positive":"negative"}>{(pkg.increase >= 0 ? "+" : "") + pkg.increase + "%"}</span></p>
       </div>
        <style jsx>{`
            .name {
                font-size: 20px;
            }
            a {
                text-decoration: none;
                color: #0099ff;
            }
            .card {
                width: 15%;
                padding: 20px;
                margin: 10px;
                border-radius: 15px;
                background-color: #e6e6e6;
            }
            span.positive {
                color: green;
            }
            span.negative {
                color: red;
            }
        `}</style>
   </div>
)

export default PackageCard