BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [contactNo] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000),
    [userType] NVARCHAR(1000) NOT NULL CONSTRAINT [User_userType_df] DEFAULT 'STUDENT',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [userId] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000),
    [accessToken] NVARCHAR(1000),
    [accessTokenExpires] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Account_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Teacher] (
    [id] INT NOT NULL IDENTITY(1,1),
    [imageUrl] NVARCHAR(1000),
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Teacher_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Teacher_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Teacher_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Student] (
    [id] INT NOT NULL IDENTITY(1,1),
    [imageUrl] NVARCHAR(1000),
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Student_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Student_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Student_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Admin] (
    [id] INT NOT NULL IDENTITY(1,1),
    [imageUrl] NVARCHAR(1000),
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Admin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admin_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Admin_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Teacher] ADD CONSTRAINT [Teacher_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Student] ADD CONSTRAINT [Student_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Admin] ADD CONSTRAINT [Admin_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
