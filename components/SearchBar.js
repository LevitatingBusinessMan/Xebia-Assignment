import Router from 'next/router'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleKeyPress(e) {
        if (e.key === "Enter" && e.target) {
            window.location.href = "/search?q="+e.target.value
        }
    }

    render() {
        return (
            <div>
                <input placeholder="search" onKeyPress={this.handleKeyPress}/>
                <style jsx>{`
                input {
                    font-size: 20px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 30px;
                    border-radius: 5px;
                    margin: 5px;
                    border: 2px solid #0099ff;
                    outline: none;
                }
                `}</style>
            </div>
        )
    }

}

export default SearchBar