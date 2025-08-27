﻿using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Configurations;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services.FileUpLoad
{
    public class FileUploadService : IFileUploadService
    {
        private readonly Cloudinary _cloudinary;

        public FileUploadService(IOptions<CloudinarySettings> options)
        {
            var settings = options.Value;
            var account = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadAsync(FileUploadRequest request, CancellationToken cancellationToken = default)
        {
            var folderName = "D-Hotel-Direct";
            var fileNameWithoutExt = Path.GetFileNameWithoutExtension(request.FileName);

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(request.FileName, request.Content),
                PublicId = fileNameWithoutExt,
                Folder = folderName, 
                Overwrite = true,
                UseFilename = true,
                UniqueFilename = false
            };

            var result = await _cloudinary.UploadAsync(uploadParams, cancellationToken);

            if (result.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception($"Cloudinary upload failed: {result.Error?.Message}");

            return result.SecureUrl.ToString();
        }
    }
}
