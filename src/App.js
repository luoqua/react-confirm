import React from 'react';
import ReactDOM from 'react-dom'

import confirm from './confirm/AppConfirm'



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false
		}
	}

	render() {
		return (
			<div>
				app
				{this.state.data.map(item => <p>{item}</p>)}
			</div>
		)
	}

	async componentDidMount(){
		let res = await confirm("确定删除吗")
		if(res) {
			console.log("是")
		} else {
			console.log("否")
		}
	}


}
export default App;
