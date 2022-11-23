import Skeleton from '@mui/material/Skeleton'
export default function () {
  return (
    <div className="skeleton-box">
      {new Array(12).fill('').map((_, index) => <Skeleton key={index} className="skeleton" variant="rectangular" height={30} />)}
    </div>
  )
}