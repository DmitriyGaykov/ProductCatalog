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
    public const string TokenIsNotValid = "Невалидный токен авторизации";
    public const string UserWasNotFound = "Пользователь не найден";
    public const string UserWasBlocked = "Пользователь заблокирован по причине: ";
    public const string YouHaveNotPermission = "У вас не доступа к данному функционалу";
}
