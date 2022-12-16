DROP DATABASE IF EXISTS nrp;
CREATE DATABASE nrp;
USE nrp;
 
CREATE TABLE `member`
(
    `id`            INT(10)         NOT NULL    AUTO_INCREMENT, 
    `regDate`       DATETIME        NOT NULL, 
    `updateDate`    DATETIME        NOT NULL, 
    `loginId`       VARCHAR(50)     NOT NULL, 
    `loginPw`      VARCHAR(50)     NOT NULL, 
    `location`      VARCHAR(200)    NOT NULL, 
    `authlevel`     SMALLINT        NOT NULL, 
    `name`          VARCHAR(50)     NOT NULL, 
    `cellphoneNum`  VARCHAR(50)     NOT NULL, 
    `email`         VARCHAR(200)    NOT NULL, 
    `delstate`      TINYINT   NOT NULL   DEFAULT 3 COMMENT '0 = 관리자 3 = 일반회원', 
    `delDate`       DATETIME, 
     PRIMARY KEY (id)
);

INSERT INTO `member`(regDate,updateDate,loginId,loginPw,location,`authLevel`,`name`,cellphoneNum,email)VALUES
(NOW(),NOW(),'admin','admin','대전시',1,'관리자','01012341234','casato6666@gmail.com'),
(NOW(),NOW(),'id1','pw1','대전시',1,'직원','0101235678','a333d@gmail.com'),
(NOW(),NOW(),'id2','pw2','대전시',3,'사용자2','01012345678','asddd@gmail.com'),
(NOW(),NOW(),'id3','pw3','대전시',3,'사용자3','01056789012','a21adfg33@gmail.com'),
(NOW(),NOW(),'id4','pw4','대전시',3,'사용자4','01051234012','a21adfgdf3@gmail.com'),
(NOW(),NOW(),'id5','pw5','대전시',3,'사용자5','01056344312','a2sadfg3@gmail.com'),
(NOW(),NOW(),'id6','pw6','대전시',3,'사용자6','01052390122','a2adfg13@gmail.com'),
(NOW(),NOW(),'id7','pw7','대전시',3,'사용자7','01012123678','asddd@gmail.com'),
(NOW(),NOW(),'id8','pw8','대전시',3,'사용자8','01056789012','a21agf3@gmail.com'),
(NOW(),NOW(),'id9','pw9','대전시',3,'사용자9','01051231232','a21afgf3@gmail.com'),
(NOW(),NOW(),'id10','pw10','대전시',3,'사용자10','01012344312','aqd33@gmail.com'),
(NOW(),NOW(),'id11','pw11','대전시',3,'사용자11','01052312322','a22213@gmail.com');

-- board Table Create SQL
-- 테이블 생성 SQL - board
CREATE TABLE board
(
    `id`    INT            NOT NULL    AUTO_INCREMENT, 
    `name`  VARCHAR(45)    NOT NULL, 
     PRIMARY KEY (id)
);

INSERT INTO board(`name`)VALUES
('notice'),
('request'),
('rental');

-- article Table Create SQL
-- 테이블 생성 SQL - article
CREATE TABLE article
(
    `id`            INT             NOT NULL    AUTO_INCREMENT, 
    `regDate`       DATETIME        NOT NULL, 
    `updateDate`    DATETIME        NOT NULL, 
    `title`         VARCHAR(200)    NOT NULL, 
    `body`          VARCHAR(45)     NOT NULL, 
    `productName`   VARCHAR(45)     NULL, 
    `productPrice`  INT             NULL, 
    `memberId`      INT(10)         NOT NULL, 
    `boardId`       INT             NOT NULL, 
    `status`        INT             NOT NULL	DEFAULT 0 COMMENT '0=기본 , 1=대여중 , 2=삭제',
     PRIMARY KEY (id)
);

-- Foreign Key 설정 SQL - article(memberId) -> member(id)
ALTER TABLE article
    ADD CONSTRAINT FK_article_memberId_member_id FOREIGN KEY (memberId)
        REFERENCES MEMBER (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - article(memberId)
-- ALTER TABLE article
-- DROP FOREIGN KEY FK_article_memberId_member_id;

-- Foreign Key 설정 SQL - article(boardId) -> board(id)
ALTER TABLE article
    ADD CONSTRAINT FK_article_boardId_board_id FOREIGN KEY (boardId)
        REFERENCES board (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - article(boardId)
-- ALTER TABLE article
-- DROP FOREIGN KEY FK_article_boardId_board_id;

INSERT INTO article(regDate,updateDate,title,`body`,productName,`productPrice`,memberId,boardId)VALUES
(NOW(),NOW(),'공지사항1','내용1',NULL,NULL,1,1),
(NOW(),NOW(),'공지사항2','내용2',NULL,NULL,1,1),
(NOW(),NOW(),'제목3','내용3','가전',30000,3,2),
(NOW(),NOW(),'제목4','내용4','캠핑용품',40000,4,2),
(NOW(),NOW(),'제목5','내용6','게임기',20000,4,2),
(NOW(),NOW(),'제목5','내용6','프린터',10000,2,3);


-- rentalRecode Table Create SQL
-- 테이블 생성 SQL - rentalRecode
CREATE TABLE rentalRecode
(
    `id`         INT         NOT NULL    AUTO_INCREMENT, 
    `regDate`    DATETIME    NOT NULL, 
    `articleId`  INT         NOT NULL, 
    `memberId`   INT         NOT NULL, 
    `status`     INT         NOT NULL	DEFAULT 0 COMMENT '0=대여 중 , 1=대여 종료', 
     PRIMARY KEY (id)
);


-- Foreign Key 설정 SQL - rentalRecode(memberId) -> member(id)
ALTER TABLE rentalRecode
    ADD CONSTRAINT FK_rentalRecode_memberId_member_id FOREIGN KEY (memberId)
        REFERENCES MEMBER (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - rentalRecode(memberId)
-- ALTER TABLE rentalRecode
-- DROP FOREIGN KEY FK_rentalRecode_memberId_member_id;

-- Foreign Key 설정 SQL - rentalRecode(articleId) -> article(id)
ALTER TABLE rentalRecode
    ADD CONSTRAINT FK_rentalRecode_articleId_article_id FOREIGN KEY (articleId)
        REFERENCES article (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - rentalRecode(articleId)
-- ALTER TABLE rentalRecode
-- DROP FOREIGN KEY FK_rentalRecode_articleId_article_id;

INSERT INTO rentalRecode(regDate,articleId,memberId)VALUES
(NOW(),3,5),
(NOW(),4,6),
(NOW(),5,7);


-- reaction Table Create SQL
-- 테이블 생성 SQL - reaction
CREATE TABLE reaction
(
    `memberId`   INT    NOT NULL, 
    `articleId`  INT    NOT NULL, 
    `reaction`   INT    NOT NULL COMMENT '0=noReaction , 1=good, -1=bad', 
     PRIMARY KEY (memberId, articleId)
);

-- Foreign Key 설정 SQL - reaction(memberId) -> member(id)
ALTER TABLE reaction
    ADD CONSTRAINT FK_reaction_memberId_member_id FOREIGN KEY (memberId)
        REFERENCES MEMBER (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - reaction(memberId)
-- ALTER TABLE reaction
-- DROP FOREIGN KEY FK_reaction_memberId_member_id;

-- Foreign Key 설정 SQL - reaction(articleId) -> article(id)
ALTER TABLE reaction
    ADD CONSTRAINT FK_reaction_articleId_article_id FOREIGN KEY (articleId)
        REFERENCES article (id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Foreign Key 삭제 SQL - reaction(articleId)
-- ALTER TABLE reaction
-- DROP FOREIGN KEY FK_reaction_articleId_article_id;


INSERT INTO reaction(memberId,articleId,reaction)VALUES
(1,1,-1),
(2,1,1),
(3,1,1);



# 연습 쿼리

SELECT * FROM `member`;
SELECT * FROM board;
SELECT * FROM article;
SELECT * FROM rentalRecode;
SELECT * FROM reaction;
