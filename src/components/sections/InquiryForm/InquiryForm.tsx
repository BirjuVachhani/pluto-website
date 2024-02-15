"use client"
import classNames from "classnames";
import  { FieldErrors, useForm }  from "react-hook-form";
import { Button } from "@/components/elements/Button/Button";
import { Container }from "@/components/elements/Container/Container";
import { InquiryFormType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { InputField } from "./InputField";
import { TextAreaField } from "./TextAreaField";
import { SelectField } from "./SelectField";
import { DatePicker } from "@/components/elements/DatePicker/DatePicker";

export type FormValues = {
  [x: string]: string;
}

export const InquiryForm: React.FC<{data: InquiryFormType}> = ({ data }) => {
  const { title, heading, eyebrow, summary, description, formType, fields, submitButton, backgroundImage, htmlid } = data;
  // @TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, control, handleSubmit, setError, watch, formState: { errors } } = useForm<FormValues>();
  console.log("FORM STATE", errors)

  // @TODO
  // cannot submit data and validate data
  // informs when data is submited successfully
async function onSubmitValid(formValues: FormValues) {
  console.log("FORM VALUES:", formValues)
  try {
    const res = await fetch(`/api/inquiry-form-submission/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        formType: formType,
        submittedContent: {
          ...formValues,
        },
      }),
    });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

function onSubmitInvalid(errors: FieldErrors<FormValues>) {
  console.log("FORM ERRORS:", errors)
}

  return (
    <section
      id={htmlid}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 my-24">
          <div className={classNames("col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start",
            {"text-white drop-shadow-lg": backgroundImage}
          )}>
            {eyebrow && (
              <div className={classNames("tracking-widest font-semibold text-center lg:text-start mb-2")}>
                {eyebrow}
              </div>
            )}
            {heading && (
              <div className={classNames("text-heading leading-tight font-heading tracking-wide text-center lg:text-start mb-5")}>
                <RichText2 data={heading} />
              </div>
            )}
            {summary && (
              <div className={classNames("prose-lg lg:prose-xl max-w-xl lg:max-w-3xl text-center lg:text-start mb-5")}>
                {summary}
              </div>
            )}
            {description && (
              <div className={classNames("prose 2xl:prose-lg",
                { "text-white drop-shadow-lg": backgroundImage}
              )}>
                <RichText2 data={description} />
              </div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-7">
            <form
              className={classNames(
                "bg-white first-letter:max-w-xl mx-auto lg:mr-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 pt-6 pb-12 rounded-assets",
                { "bg-opacity-90": backgroundImage },
                { "gap-x-0": fields.length === 1 }
              )}
              onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
            >
              {fields.length > 0 &&
                fields.map((fieldItem) => (
                  <div
                    key={fieldItem.id} 
                    className={classNames("relative col-span-2 flex flex-col",
                      { "md:col-span-1": fieldItem.uiWidth === "half-size"}
                    )}
                  >
                    <div className="text-xs text-red-500 h-6 pt-1 pl-4">
                      { errors[fieldItem.label]?.type === "required" && (
                        <p>required * </p>
                      )}
                      { errors[fieldItem.label]?.type === "pattern" &&  (
                        <p>Wrong format. Please try again. </p> 
                      )}
                    </div>
                    { fieldItem.helpText && (
                      <div className="text-neutral-800 pl-2 pb-2">
                        {fieldItem.helpText}
                      </div>
                    )}
                    {fieldItem.fieldType === "select" && (
                      <SelectField data={fieldItem} control={control} register={register} />
                    )}
                    {fieldItem.fieldType === "date" && (
                      <DatePicker name={fieldItem.label} data={fieldItem} control={control} register={register} />
                    )}
                    {fieldItem.fieldType === "datetime" && (
                      <DatePicker name={fieldItem.label} data={fieldItem} control={control} register={register} showTimeSelect={true} />
                    )}
                    {fieldItem.fieldType === "textarea" && (
                      <TextAreaField data={fieldItem} register={register} />
                    )}
                    {(fieldItem.fieldType !== "textarea" && fieldItem.fieldType !== "select" && fieldItem.fieldType !== "date" && fieldItem.fieldType !== "datetime") && (
                      <InputField data={fieldItem} register={register} />
                    )}
                  </div>
                ))}
              <div className={classNames("col-span-2 flex flex-col mt-6")}>
                {submitButton ? (
                  <Button
                    variant={submitButton.buttonVariant ?? "black"}
                    size="lg"
                    type="submit"
                  >
                    {submitButton.text}
                  </Button>
                ) : (
                  <Button
                    variant="black"
                    size="lg"
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}