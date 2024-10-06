import { z } from "zod";
import { DocType } from "@prisma/client";
import { sanitizeStringToOnlyNumber } from "@/utils/parser/other/sanitizeStringToOnlyNumber";
import { validation } from "..";

export const accountSchema = z
  .object({
    fullname: z.string({ message: "Obrigatório" }),
    professional_number: z.string({ message: "Obrigatório" }), // TODO: validate
    document_type: z.nativeEnum(DocType, { message: "Deve ser CPF ou CNPJ" }),
    document: z
      .string({ message: "Obrigatório" })
      .transform(sanitizeStringToOnlyNumber),
  })
  .refine(
    ({ document_type, document }) => {
      if (document_type === "CPF") return validation.cpf(document);
      return validation.cnpj(document);
    },
    ({ document_type }) => {
      const path = ["document"];
      if (document_type === "CPF") return { message: "CPF inválido", path };
      return { message: "CNPJ inválido", path };
    }
  );
