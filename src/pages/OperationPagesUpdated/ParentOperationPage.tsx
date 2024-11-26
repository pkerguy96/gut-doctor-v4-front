import { useState } from "react";
import StepperComponant from "../../components/StepperComponant";
import RadioPage from "./radioPage";

const ParentOperationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (newStep: any) => {
    setActiveStep(newStep);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <StepperComponant activeStep={activeStep} />
      {activeStep === 0 && (
        <RadioPage
        /* onNext={() => {
            handleStepChange(1);
          }} */
        />
      )}
    </div>
  );
};

export default ParentOperationPage;
