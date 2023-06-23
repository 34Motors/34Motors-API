import { randomUUID } from "crypto";
import { prismaClient } from "../../database";
import { AppError } from "../../errors";
import { resetPasswordTemplate, sendEmail } from "../../utils/sendEmail.utils";

export const sendEmailResetPasswordService = async (email: string) => {
  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const resetToken = randomUUID();

  await prismaClient.user.update({
    where: { email },
    data: {
      resetToken: resetToken,
    },
  });

  const resetPassword = await resetPasswordTemplate(
    user.name,
    email,
    resetToken
  );

  await sendEmail(resetPassword);
};
