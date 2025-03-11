using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Exceptions;

public static class ExceptionsText
{
    public const string FieldEmailsShouldNotBeEmpty = "Введите вашу электронную почту";
    public const string FieldPasswordShouldNotBeEmpty = "Введите ваш пароль";
    public const string EmailOrPasswordAreNotValid = "Неверный логин или пароль!";
}
