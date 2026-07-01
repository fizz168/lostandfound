import { useNavigate } from 'react-router-dom'
import ItemCard from '../components/Itemcard'

function HomePage({ items }) {
  const navigate = useNavigate()
  const lost = items.filter((i) => i.type === 'lost').slice(0, 3)
  const found = items.filter((i) => i.type === 'found').slice(0, 3)

  const stats = [
    { label: 'Items matched', value: '1.2k+' },
    { label: 'Claims resolved', value: '94%' },
    { label: 'Campus hubs', value: '18' },
    { label: 'Response time', value: '< 6h' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b-4 border-black pb-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#121212] sm:p-8">
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-black/70">
              <span className="h-3 w-3 rounded-full border-2 border-black bg-[#D02020]" />
              Campus recovery station
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-6xl lg:text-7xl">
              Find what belongs to you.
            </h1>

            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-black/70 sm:text-lg">
              Report lost items, browse recoveries, and reunite belongings with their owners through one bold campus-wide system.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/report-lost')}
                className="border-2 border-black bg-[#D02020] px-5 py-3 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Report Lost Item
              </button>
              <button
                onClick={() => navigate('/report-found')}
                className="border-2 border-black bg-[#1040C0] px-5 py-3 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Report Found Item
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden border-4 border-black bg-[#1040C0] p-6 shadow-[8px_8px_0px_0px_#121212]">
            <span className="absolute left-6 top-6 h-20 w-20 rounded-full border-4 border-black bg-white/20" />
            <span className="absolute right-10 top-14 h-16 w-16 rotate-45 border-4 border-black bg-[#F0C020]" />
            <span className="absolute bottom-10 left-1/2 h-24 w-24 -translate-x-1/2 border-4 border-black bg-white" />
            <span className="absolute bottom-10 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[48px] border-b-[#D02020] border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent" />
            <span className="absolute bottom-4 right-4 h-16 w-16 rotate-12 border-4 border-black bg-[#F0C020]" />

            <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end">
              <div className="inline-flex self-start rounded-none border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-black">
            
              </div>
              <div className="mt-16 max-w-[180px] text-4xl font-black uppercase leading-none tracking-[-0.06em] text-white">
               
              </div>
            </div>
          </div>
        </div>
      </section>
      

      <section className="border-b-4 border-black py-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-black/60">Recent Items</div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-black">Lost Items</h2>
          </div>
          <button onClick={() => navigate('/browse')} className="border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            View all
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lost.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`)} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-black/60">Recent Items</div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-black">Found Items</h2>
          </div>
          <button onClick={() => navigate('/browse')} className="border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            View all
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {found.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`)} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage;