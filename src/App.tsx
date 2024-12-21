import './App.css';
import {app} from "../firebase/config"

// To add components `bunx --bun shadcn@latest add`

function App() {
	console.log(app)
	return (
		<div className='container'>
			<h1 className='text-2xl'>Mini Blog</h1>
		</div>
	);
}

export default App;
