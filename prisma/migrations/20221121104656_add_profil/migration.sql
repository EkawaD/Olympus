-- CreateTable
CREATE TABLE "Profil" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Nom',
    "color" TEXT NOT NULL DEFAULT '#008080',
    "avatar" TEXT NOT NULL DEFAULT '/avatar.jpg',
    "firstname" TEXT NOT NULL DEFAULT 'Prénom',
    "address" TEXT NOT NULL DEFAULT 'Chez moi',
    "intro" TEXT NOT NULL DEFAULT 'Bienvenue sur mon CV',
    "website" TEXT,
    "tel" TEXT,
    "mail" TEXT,
    "linkedin" TEXT,
    "github" TEXT,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lettre" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "objet" TEXT,

    CONSTRAINT "Lettre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ref" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "file" TEXT NOT NULL,

    CONSTRAINT "Ref_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diplome" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "title" TEXT NOT NULL,
    "diplomaDate" TIMESTAMP(3),
    "school" TEXT NOT NULL,
    "place" TEXT,
    "description" TEXT,

    CONSTRAINT "Diplome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "entreprise" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "place" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "github" TEXT,
    "demo" TEXT,
    "tags" TEXT[] DEFAULT ARRAY['']::TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "skill" TEXT NOT NULL,
    "tech" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "profilId" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profil_userId_key" ON "Profil"("userId");

-- AddForeignKey
ALTER TABLE "Profil" ADD CONSTRAINT "Profil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lettre" ADD CONSTRAINT "Lettre_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ref" ADD CONSTRAINT "Ref_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diplome" ADD CONSTRAINT "Diplome_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobby" ADD CONSTRAINT "Hobby_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;
