// ** Demo Components Imports
import { useParams } from 'react-router-dom'
import Preview from 'views/apps/invoice/preview/Preview'

const InvoicePreview = () => {
  const params = useParams()
  return <Preview id={params.id} />
}

export default InvoicePreview
