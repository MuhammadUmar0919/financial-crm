// ** Demo Components Imports
import { useParams } from 'react-router-dom'
import Edit from 'views/apps/invoice/edit/Edit'

// ** Styled Component
import DatePickerWrapper from '@core/styles/libs/react-datepicker'

const InvoiceEdit = () => {
  const params = useParams()
  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Edit id={params.id} />
    </DatePickerWrapper>
  )
}

export default InvoiceEdit
