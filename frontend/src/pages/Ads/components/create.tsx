import { useState } from "react";
import {useCreateEditFormConfig} from "../constantHooks.ts";
import {useApiHelpers} from "../apiHooks.ts";
import Card from "../../../components/molecules/Card";
import FormBuilder from "../../../components/organisms/FormBuilder";
import StepProgress from "../../../components/atoms/StepProgress";
import AdPreview from "../../../components/molecules/AdCreatePreview";
import Button from "../../../components/atoms/Button";
import type {AdRequestType} from "../types.ts";

const CreateAdPage = () => {
    const steps = useCreateEditFormConfig();
    const stepTitles = [
        "Basic Info",
        "Photos & Description",
        "Technical",
    ];
    const { onCreate } = useApiHelpers();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [showPreview, setShowPreview] = useState(false);

    const handleNext = (values: Record<string, any>) => {
        const updated = { ...formData, ...values };
        setFormData(updated);

        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onCreate(updated as AdRequestType);
        }
    };

    const handlePreviewButtonClick = () => {
        setShowPreview(prev => !prev)
    }

    return (
        <div className="create-page">
            <StepProgress
                steps={stepTitles}
                currentStep={step}
                setStep={setStep}
            />

            {step > 1 && (
                <div className="create-toolbar">
                    <Button
                        className="preview-toggle"
                        onClick={(handlePreviewButtonClick)}
                        text={showPreview ? "Hide Preview" : "Show Preview"}
                    />
                </div>
            )}

            <div className={`create-layout ${showPreview ? "preview-open" : ""}`}>
                <Card title="Create New Ad">
                    <FormBuilder
                        config={steps[step]}
                        initialValues={formData}
                        onSubmit={handleNext}
                        submitText={
                            step === steps.length - 1
                                ? "Publish"
                                : "Next"
                        }
                    />
                </Card>

                {showPreview && (
                    <AdPreview data={formData} />
                )}
            </div>
        </div>
    );
};

export default CreateAdPage;