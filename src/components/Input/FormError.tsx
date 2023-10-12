const FormError = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div className='min-h-[1.25rem] mt-1'>
      <p className=' text-red-600 text-sm'>{errorMessage ?? ''}</p>
    </div>
  )
}

export default FormError
