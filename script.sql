USE [master]
GO
/****** Object:  Database [DB_PROYECTO]    Script Date: 31/7/2023 14:41:03 ******/
CREATE DATABASE [DB_PROYECTO]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DB_PROYECTO', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DB_PROYECTO.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DB_PROYECTO_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\DB_PROYECTO_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DB_PROYECTO] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DB_PROYECTO].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DB_PROYECTO] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET ARITHABORT OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DB_PROYECTO] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DB_PROYECTO] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DB_PROYECTO] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DB_PROYECTO] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DB_PROYECTO] SET  MULTI_USER 
GO
ALTER DATABASE [DB_PROYECTO] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DB_PROYECTO] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DB_PROYECTO] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DB_PROYECTO] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DB_PROYECTO] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DB_PROYECTO] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DB_PROYECTO] SET QUERY_STORE = ON
GO
ALTER DATABASE [DB_PROYECTO] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DB_PROYECTO]
GO
/****** Object:  Table [dbo].[admins]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admins](
	[id] [int] NOT NULL,
	[dni] [varchar](20) NOT NULL,
	[password] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[escrutinio_final]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[escrutinio_final](
	[id] [int] NOT NULL,
	[lista] [varchar](50) NOT NULL,
	[presidencia] [int] NOT NULL,
	[secretarias] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[padron_electoral_general___hoja_1]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[padron_electoral_general___hoja_1](
	[curso] [varchar](11) NULL,
	[dni] [int] NOT NULL,
	[apellido_nombre] [varchar](38) NULL,
	[count] [int] NULL,
	[boleta_count] [int] NULL,
	[habilitado] [varchar](2) NOT NULL,
	[hora] [datetime] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[padron_electoral_general___hoja_1] ADD  DEFAULT ((0)) FOR [count]
GO
ALTER TABLE [dbo].[padron_electoral_general___hoja_1] ADD  DEFAULT ((0)) FOR [boleta_count]
GO
ALTER TABLE [dbo].[padron_electoral_general___hoja_1] ADD  DEFAULT ('no') FOR [habilitado]
GO
ALTER TABLE [dbo].[padron_electoral_general___hoja_1] ADD  DEFAULT (getdate()) FOR [hora]
GO
/****** Object:  StoredProcedure [dbo].[ActualizarContador]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ActualizarContador]
    @Lista NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF @Lista = '453'
    BEGIN
        UPDATE escrutinio_final
        SET presidencia = presidencia + 1, secretarias = secretarias + 1
        WHERE id = 1;
    END
    ELSE IF @Lista = '101'
    BEGIN
        UPDATE escrutinio_final
        SET presidencia = presidencia + 1, secretarias = secretarias + 1
        WHERE id = 2;
    END
    ELSE
    BEGIN
        RAISERROR('Lista seleccionada inválida', 16, 1);
        RETURN;
    END

    SELECT 'success' AS Result;
END

GO
/****** Object:  StoredProcedure [dbo].[GetAdminByDNI]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAdminByDNI]
    @dni VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM dbo.admins
    WHERE dni = @dni;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllAdmins]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllAdmins]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM dbo.admins;
END;

GO
/****** Object:  StoredProcedure [dbo].[IncrementarBoletaCountPorDNI]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[IncrementarBoletaCountPorDNI]
    @dni VARCHAR(20)
AS
BEGIN
    -- Verificar si el DNI existe en la tabla
    IF EXISTS (SELECT 1 FROM dbo.padron_electoral_general___hoja_1 WHERE dni = @dni)
    BEGIN
        -- Incrementar el valor de la columna count en 1
        UPDATE dbo.padron_electoral_general___hoja_1
        SET boleta_count = boleta_count + 1
        WHERE dni = @dni;

        -- Devolver un mensaje de éxito
        SELECT 'success' AS Result;
    END
    ELSE
    BEGIN
        -- El DNI no existe en la tabla, devolver un mensaje de error
        SELECT 'error' AS Result;
    END
END

GO
/****** Object:  StoredProcedure [dbo].[IncrementarCountPorDNI]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[IncrementarCountPorDNI]
    @dni VARCHAR(20)
AS
BEGIN
    -- Verificar si el DNI existe en la tabla
    IF EXISTS (SELECT 1 FROM dbo.padron_electoral_general___hoja_1 WHERE dni = @dni)
    BEGIN
        -- Incrementar el valor de la columna count en 1
        UPDATE dbo.padron_electoral_general___hoja_1
        SET count = count + 1
        WHERE dni = @dni;

        -- Devolver un mensaje de éxito
        SELECT 'success' AS Result;
    END
    ELSE
    BEGIN
        -- El DNI no existe en la tabla, devolver un mensaje de error
        SELECT 'error' AS Result;
    END
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion1]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion1]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 1 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 2 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (1, 2);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion2]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion2]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 1 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 3 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (1, 3);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion3]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion3]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 2 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 1 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (1, 2);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion4]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion4]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 2 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 3 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (2, 3);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion5]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion5]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 3 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 1 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (1, 3);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion6]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion6]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = CASE WHEN id = 3 THEN presidencia + 1 ELSE presidencia END,
        secretarias = CASE WHEN id = 2 THEN secretarias + 1 ELSE secretarias END
    WHERE id IN (2, 3);
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Combinacion7]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Combinacion7]
AS
BEGIN
    UPDATE escrutinio_final
    SET presidencia = presidencia + 1,
        secretarias = secretarias + 1
    WHERE id = 3;
END

GO
/****** Object:  StoredProcedure [dbo].[sp_ConsultarDni]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_ConsultarDni]
    @dni VARCHAR(20)
AS
BEGIN
    SELECT curso, apellido_nombre, habilitado, "count", boleta_count 
    FROM padron_electoral_general___hoja_1
    WHERE dni = @dni
END
GO
/****** Object:  StoredProcedure [dbo].[sp_HabilitarUsuario]    Script Date: 31/7/2023 14:41:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_HabilitarUsuario]
    @dni NVARCHAR(50)
AS
BEGIN
    UPDATE padron_electoral_general___hoja_1
    SET habilitado = 'si'
    WHERE dni = @dni;
END

GO
USE [master]
GO
ALTER DATABASE [DB_PROYECTO] SET  READ_WRITE 
GO
