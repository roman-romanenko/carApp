import {useEffect, useState} from "react";
import {useCreateEditFormConfig} from "../constantHooks.ts";
import {useApiHelpers} from "../apiHooks.ts";
import Card from "../../../components/molecules/Card";
import FormBuilder from "../../../components/organisms/FormBuilder";
import StepProgress from "../../../components/atoms/StepProgress";
import AdPreview from "../../../components/molecules/AdCreatePreview";
import Button from "../../../components/atoms/Button";
import type {AdRequestType, AdResponeType} from "../types.ts";
import Loader from "../../../components/atoms/Loader";
import {useParams} from "react-router-dom";

const UpdateAdPage = () => {
    const { id } = useParams();
    const steps = useCreateEditFormConfig({ isEdit: true });
    const stepTitles = [
        "Technical",
        "Photos & Description",
        "Price"
    ];
    const { onGetAd, loading, onUpdate } = useApiHelpers();
    const [step, setStep] = useState(0);
    const [ad, setAd] = useState<AdResponeType | null>(null)
    const [formData, setFormData] = useState({});
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if(id) {
            onGetAd(id, setAd)
        }
    }, [id]);

    const handleNext = (values: Record<string, any>) => {
        const updated = { ...formData, ...values };
        setFormData(updated);

        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onUpdate(updated as AdRequestType);
        }
    };

    const handlePreviewButtonClick = () => {
        setShowPreview(prev => !prev)
    }

    if (loading) {
        return <Loader />;
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
                <Card title="Update Ad" maxContentSize={"sm"}>
                    <FormBuilder
                        config={steps[step]}
                        initialValues={{...ad}}
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

export default UpdateAdPage;