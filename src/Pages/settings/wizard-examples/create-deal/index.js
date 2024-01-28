// ** Demo Components Imports
import CreateDeal from 'views/pages/wizard-examples/create-deal'

// ** Custom Component
import DatePickerWrapper from '@core/styles/libs/react-datepicker'

const WizardExamples = () => {
  return (
    <DatePickerWrapper>
      <CreateDeal />
    </DatePickerWrapper>
  )
}

export default WizardExamples
