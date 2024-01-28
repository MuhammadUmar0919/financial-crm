// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'
import { useParams } from 'react-router-dom'

// ** Demo Components Imports
import PrintPage from 'views/apps/invoice/print/PrintPage'

const InvoicePrint = () => {
  const params = useParams()
  return <PrintPage id={params.id} />
}
InvoicePrint.getLayout = page => <BlankLayout>{page}</BlankLayout>
InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

export default InvoicePrint
