import { Button } from 'src/components/Button'
import { InputSpacer } from 'src/components/Input'
import { Popover } from 'src/components/Popover'

const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <div className='flex flex-wrap gap-4 items-center'>
          <div>Sort by</div>
          <InputSpacer className='flex justify-center items-center'>
            <Button type='submit' className='rounded-sm py-2 px-4 bg-orange text-white capitalize text-sm'>
              popular
            </Button>
          </InputSpacer>
          <InputSpacer className='flex justify-center items-center'>
            <Button type='submit' className='rounded-sm py-2 px-4 bg-white capitalize text-sm'>
              latest
            </Button>
          </InputSpacer>
          <InputSpacer className='flex justify-center items-center'>
            <Button type='submit' className='rounded-sm py-2 px-4 bg-white capitalize text-sm'>
              top sales
            </Button>
          </InputSpacer>
          <InputSpacer className='rounded-sm flex justify-normal items-center cursor-pointer bg-white'>
            <Popover
              className='py-2 w-40 px-2.5 flex items-center justify-between'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm text-sm'>
                  <div className='flex flex-col w-40'>
                    <button className='p-2.5 text-left hover:text-orange'>
                      <span>Price: Low to High</span>
                    </button>
                    <button className='p-2.5 text-left hover:text-orange'>
                      <span>Price: High to Low</span>
                    </button>
                  </div>
                </div>
              }
            >
              <span className='capitalize text-sm'>price</span>
              <svg viewBox='0 0 10 6' className='h-3 w-3'>
                <path
                  d='M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z'
                  fillRule='nonzero'
                />
              </svg>
            </Popover>
          </InputSpacer>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2 flex justify-between'>
            <InputSpacer className='flex justify-center items-center'>
              <Button className='rounded-tl-sm rounded-bl-sm p-2 shadow-sm bg-white/60 border-slate-300 border cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Button>
            </InputSpacer>
            <InputSpacer className='flex justify-center items-center'>
              <Button className='rounded-tr-sm rounded-br-sm p-2 shadow-sm bg-gray-300/40 hover:bg-white border-slate-300 border'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Button>
            </InputSpacer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList