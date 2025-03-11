using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Crypto;

public static class ShaHasher
{
    public static string Sha256(string message)
    {
        if (string.IsNullOrEmpty(message))
            throw new ArgumentNullException(nameof(message), "Переданное сообщение пустое");

        using var sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(message));

        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }
}
