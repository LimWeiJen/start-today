-- CreateTable
CREATE TABLE "User" (
    "name" STRING NOT NULL,
    "github" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("github")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "day" INT4 NOT NULL,
    "title" STRING NOT NULL,
    "content" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("github") ON DELETE RESTRICT ON UPDATE CASCADE;
