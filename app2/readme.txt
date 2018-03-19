App2 : MySQL

---
git-scm.com => Command-line Github
Github-Desktop => client
cmd :> git clone <link>
generate package.json $ npm -init -y

WorkBench
1) Create Schema game1 {

}
2) RMB > Table > Create Table...
3) Name "user"
4) 

id INT PK NN UQ AI
name VARCHAR(45) NN UQ
password VARCHAR(45) NN
score INT

Apply Finish

5) 

select * from game1.user
or
RMB game1 > Set as Defualt Schema
select * from user

insert into game1.user(name,password,score) values('MyName','123456',9500); //insert 2 data
พาสเวิร์ดในดาต้าเบสต้องเข้ารหัสไม่งั้นผิดกฎหมาย

6) npm install mysql -save //เซฟไปใน package.json
7) alt + shift + f จัดให้สวย (VSCode)