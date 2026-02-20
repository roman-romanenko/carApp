import type {StepProgressProps} from "./types.ts";

const StepProgress = ({
  steps,
  currentStep,
  setStep
}: StepProgressProps) => {
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="step-progress">
            <div className="step-progress-bar">
                <div
                    className="step-progress-fill"
                    style={{width: `${progress}%`}}
                />
            </div>

            <div className="step-progress-steps">
                {steps.map((step, index) => {
                    const isCurrent = index === currentStep;
                    const isDone = index < currentStep
                    return (
                        <div
                            key={step}
                            onClick={() => {
                                if (isDone) {
                                    setStep(index)
                                }
                            }}
                            className={`step-item ${
                                isCurrent
                                    ? "active"
                                    : isDone
                                        ? "done"
                                        : ""
                            }`}
                        >
                            <div className="step-dot"/>
                            <span>{step}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default StepProgress;
