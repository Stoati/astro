import checkAndGetStoatiId from "../../tools/checkAndGetStoatiId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string(),
  content: z.string(),
  challenge: z.any(),
});

const useContactForm = () => {
  const [messageSent, setMessageSent] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      challenge: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch(
      `https://api.stoati.fr/shops/${checkAndGetStoatiId()}/messages`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          data: "",
          type: "Contact",
        }),
      }
    );

    if (response.ok) {
      setMessageSent(true);
    }
  };

  const challenge = useWatch({ control: form.control, name: "challenge" });

  return {
    form,
    isSent: messageSent,
    onSubmit: (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return form.handleSubmit(onSubmit)();
    },
    isSentDisabled: challenge === null,
  };
};

export default useContactForm;
