# Generated by Django 3.2.3 on 2021-08-03 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_profile_test_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='test_type',
            field=models.CharField(choices=[('A', 'A'), ('A1', 'A1'), ('A1-AA', 'A1-AA'), ('A1-NA', 'A1-NA'), ('A1-NO', 'A1-NO'), ('A1-T', 'A1-T'), ('A1-T-AA', 'A1-T-AA'), ('A2', 'A2'), ('A2-AA', 'A2-AA'), ('A2-G', 'A2-G'), ('A2-G-AA', 'A2-G-AA'), ('A2-G-NA', 'A2-G-NA'), ('A2-G-NO', 'A2-G-NO'), ('A2-NA', 'A2-NA'), ('A2-NO', 'A2-NO'), ('A2-T', 'A2-T'), ('A2-T-AA', 'A2-T-AA'), ('A-AA', 'A-AA'), ('A-G', 'A-G'), ('A-G-AA', 'A-G-AA'), ('A-G-NA', 'A-G-NA'), ('A-G-NO', 'A-G-NO'), ('A-LV-H-L', 'A-LV-H-L'), ('A-LV-L', 'A-LV-L'), ('A-LV-M', 'A-LV-M'), ('AM2', 'AM2'), ('AM2-NO', 'AM2-NO'), ('AM4', 'AM4'), ('AM4-NO', 'AM4-NO'), ('AMTH', 'AMTH'), ('AMTH-I', 'AMTH-I'), ('AMTH-I-T', 'AMTH-I-T'), ('AMTH-VE', 'AMTH-VE'), ('A-NA', 'A-NA'), ('A-NO', 'A-NO'), ('A-T', 'A-T'), ('A-T-AA', 'A-T-AA'), ('ATH', 'ATH'), ('ATH-I', 'ATH-I'), ('ATH-I-T', 'ATH-I-T'), ('ATH-VE', 'ATH-VE'), ('AVB-A', 'AVB-A'), ('AVB-A1', 'AVB-A1'), ('AVB-A1-AA', 'AVB-A1-AA'), ('AVB-A2', 'AVB-A2'), ('AVB-A2-AA', 'AVB-A2-AA'), ('AVB-A-AA', 'AVB-A-AA'), ('B', 'B'), ('B-AA', 'B-AA'), ('B-AA-H', 'B-AA-H'), ('BE', 'BE'), ('BE-AA', 'BE-AA'), ('BE-NA', 'BE-NA'), ('BE-NO', 'BE-NO'), ('BE-T', 'BE-T'), ('BE-T-AA', 'BE-T-AA'), ('B-FA', 'B-FA'), ('B-FA-AA', 'B-FA-AA'), ('B-FA-NA', 'B-FA-NA'), ('B-FA-NO', 'B-FA-NO'), ('B-H', 'B-H'), ('B-LV-BTS-L', 'B-LV-BTS-L'), ('B-LV-BTSLD', 'B-LV-BTSLD'), ('B-LV-H-L', 'B-LV-H-L'), ('B-LV-J-L', 'B-LV-J-L'), ('B-LV-J-M', 'B-LV-J-M'), ('B-LVK-M', 'B-LVK-M'), ('B-LV-L', 'B-LV-L'), ('B-LV-L-M', 'B-LV-L-M'), ('B-LV-P-L', 'B-LV-P-L'), ('B-LV-V-L', 'B-LV-V-L'), ('B-NA', 'B-NA'), ('B-NO', 'B-NO'), ('B-RE', 'B-RE'), ('B-RE-AA', 'B-RE-AA'), ('B-RE-AA-H', 'B-RE-AA-H'), ('B-RE-H', 'B-RE-H'), ('B-RT', 'B-RT'), ('B-RT-AA', 'B-RT-AA'), ('B-T', 'B-T'), ('B-T-AA', 'B-T-AA'), ('BTH', 'BTH'), ('BTH-E', 'BTH-E'), ('BTH-E-VE', 'BTH-E-VE'), ('BTH-I', 'BTH-I'), ('BTH-I-T', 'BTH-I-T'), ('BTH-VE', 'BTH-VE'), ('B-T-NA', 'B-T-NA'), ('B-T-NO', 'B-T-NO'), ('CE-LV-L', 'CE-LV-L'), ('C-LV-H-L', 'C-LV-H-L'), ('C-LV-L', 'C-LV-L'), ('C-LV-M', 'C-LV-M'), ('DE-LV-L', 'DE-LV-L'), ('D-LV-H-L', 'D-LV-H-L'), ('D-LV-L', 'D-LV-L'), ('D-LV-M', 'D-LV-M'), ('RB', 'RB'), ('TE-LV-L', 'TE-LV-L'), ('T-LV-BTS-L', 'T-LV-BTS-L'), ('T-LV-L', 'T-LV-L'), ('T-LV-M', 'T-LV-M')], editable=False, max_length=30),
        ),
    ]
