import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/react'

export default function Dashboard() {
  const [houses, setHouses] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const { getToken } = useAuth()

  const fetchHouses = async () => {
    const token = await getToken()
    const res = await fetch('http://localhost:3000/api/houses', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setHouses(data)
  }

  useEffect(() => {
    fetchHouses()
  }, [])

  const addHouse = async () => {
    const token = await getToken()
    await fetch('http://localhost:3000/api/houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, address })
    })
    setName('')
    setAddress('')
    fetchHouses()
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>

      {/* Add Form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-bold mb-3">Add New Property</h3>
        <div className="flex gap-3">
          <input
            className="border rounded p-2 flex-1"
            placeholder="House name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="border rounded p-2 flex-1"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <button
            onClick={addHouse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {houses.map(house => (
          <div key={house.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg">{house.name}</h3>
            <p className="text-gray-500 text-sm">{house.address}</p>
            <div className="mt-3">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}