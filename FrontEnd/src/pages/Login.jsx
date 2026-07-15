
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '../api'

function Login({ setAuthed, setUser, setToken }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unable to log in.')
        return
      }

      setToken(data.token)
      setUser(data.user)
      setAuthed(true)
      navigate('/')
    } catch (err) {
      console.error('Login failed', err)
      setError('Unable to log in.')
    }
  }

  return (
    <div className="flex min-h-[78vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#121212] sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-4 border-black bg-[#F0C020] shadow-[4px_4px_0px_0px_#121212]">
              <span className="text-2xl font-black text-black">L</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-black">Lost&amp;Found</h2>
            <p className="mt-2 text-sm font-medium text-black/60">Welcome back — sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.35em] text-black/60">
                University Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                type="email"
                required
                className="w-full border-2 border-black bg-[#F0F0F0] px-3 py-3 text-sm outline-none placeholder:text-black/35 focus:border-[#1040C0]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.35em] text-black/60">
                Password
              </label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                type="password"
                required
                className="w-full border-2 border-black bg-[#F0F0F0] px-3 py-3 text-sm outline-none placeholder:text-black/35 focus:border-[#1040C0]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 border-2 border-black accent-[#1040C0]" />
                <span>Remember me</span>
              </label>
              <button type="button" className="hover:text-[#1040C0]">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full border-2 border-black bg-[#D02020] px-4 py-3 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login;