/*
  Warnings:

  - A unique constraint covering the columns `[best_answer_id]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `question_id` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "question_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "best_answer_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "questions_best_answer_id_key" ON "questions"("best_answer_id");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_best_answer_id_fkey" FOREIGN KEY ("best_answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
