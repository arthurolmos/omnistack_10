import React, { useEffect, useState } from 'react'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import api from './services/api'

import './App.css'
import './Sidebar.css'
import './Main.css'
import './global.css'

function App() {

  const [ devs, setDevs ] = useState([])

  async function handleAddDev(data) {

    console.log(data)

    const resp = await api.post('/devs', data)

    if(resp.status === 404) return console.log(resp)
    
    setDevs([...devs, resp.data])
    
    return resp
}

  useEffect(() => {
    async function loadDevs(){
      const resp = await api.get('/devs')

      setDevs(resp.data)
    }

    loadDevs()
  }, [])

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm 
          onSubmit={handleAddDev}
        />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              key={dev._id}
              dev={dev} 
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
