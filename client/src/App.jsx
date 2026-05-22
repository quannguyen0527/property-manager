import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Property Manager</h1>
        <div className="flex gap-4">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>
      <main>
        <Show when="signed-in">
          <Dashboard />
        </Show>
        <Show when="signed-out">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to Property Manager</h2>
              <p className="text-gray-500 mb-6">Sign in to manage your properties</p>
              <SignInButton>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </Show>
      </main>
    </div>
  )
}   