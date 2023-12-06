const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. All Rights Reserved.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              Country & Region: Singapore Indonesia Taiwan Thailand Malaysia Vietnam Philippines Brazil México Colombia
              Chile
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div>Shopee Company Limited</div>
          <div className='mt-2'>
            Floors 4-5-6, Capital Place Building, No. 29, Lieu Giai Street, Ngoc Khanh ward, Ba Dinh District, Hanoi,
            Vietnam
          </div>
          <div className='mt-2'>Person in charge of information management: Nguyen Duc Tri</div>
          <div className='mt-2'>Business Registration Certificate No: 0106773786</div>
          <div className='mt-2'>© 2015 - Copyright belongs to Shopee Company Limited</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
