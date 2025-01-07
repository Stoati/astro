import Altcha from "../Altcha/Altcha";
import "./ContactForm.css";
import useContactForm from "./useContactForm";

export default function ContactForm({
  classNames,
  disableDefaultStyle,
}: {
  disableDefaultStyle?: boolean;
  classNames?: {
    form?: string;
    label?: string;
    input?: string;
    labelInputContainer?: string;
    button?: string;
  };
}) {
  const { form, onSubmit, isSent, isSentDisabled } = useContactForm();

  if (isSent) {
    return (
      <div className="max-w-md w-full space-y-6 flex flex-col items-center justify-stretch">
        Merci pour ce message !!
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      id="stoati-contact-form"
      className={
        disableDefaultStyle
          ? classNames?.form
          : "stoati-contact-form " + classNames?.form
      }
    >
      <div className={classNames?.labelInputContainer}>
        <label htmlFor="title" className={classNames?.label}>
          Titre
        </label>
        <input
          type="text"
          id="title"
          className={classNames?.input}
          {...form.register("title")}
        />
      </div>
      <div className={classNames?.labelInputContainer}>
        <label htmlFor="message" className={classNames?.label}>
          Message
        </label>
        <textarea
          id="message"
          {...form.register("title")}
          className={classNames?.label}
        />
      </div>
      <Altcha
        onValueChange={(val) => {
          form.setValue("challenge", val);
        }}
      />
      <button className={classNames?.button} disabled={isSentDisabled}>
        Envoyer
      </button>
    </form>
  );
}
