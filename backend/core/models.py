from djongo import models
from djongo.models import DjongoManager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MaterialsbyState(models.Model):
    """docstring for MaterialsbyState"""
    def __init__(self):
        state = models.CharField(max_length=10)
        paper = models.CharField(max_length=10000)
        plastic = models.CharField(max_length=10000)
        glass = models.CharField(max_length=10000)
        steel = models.CharField(max_length=10000)
        cooperatives = models.CharField(max_length=10000)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O Email deve ser informado')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    email = models.EmailField(unique=True, max_length=254)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    name = models.CharField('name', max_length=100, default="Não informado")

    USERNAME_FIELD = 'email'
    
    objects = UserManager()
    djongo_objects = DjongoManager()
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_perms(self, perm_list, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_staff


class RecycleBalance(models.Model):
    date_balance = models.DateTimeField(auto_now_add=True)
    user_id = models.IntegerField(unique=True)
    material_id = models.IntegerField(unique=True)
    mesure_unit = models.IntegerField(unique=True)
    is_active = models.BooleanField(default=True)
