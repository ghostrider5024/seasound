CREATE DATABASE spotify;

USE spotify;

CREATE TABLE ROLE (
	ROLE_ID INT NOT NULL AUTO_INCREMENT,
	ROLE_NAME VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (ROLE_ID)
);

CREATE TABLE USER (
	USER_ID INT NOT NULL AUTO_INCREMENT,
	FULLNAME VARCHAR(255) NOT NULL,
	EMAIL VARCHAR(255) NOT NULL UNIQUE,
	PASSWORD VARCHAR(255) NOT NULL,
	IMAGE VARCHAR(255),
	ROLE_ID INT DEFAULT 2, -- 1 = Admin, 2 = User
	PRIMARY KEY (USER_ID)
);

CREATE TABLE PLAYLIST (
	PLAYLIST_ID INT NOT NULL AUTO_INCREMENT,
	TITLE VARCHAR(255) NOT NULL,
    IMAGE VARCHAR(255),
	USER_ID INT,
	PRIMARY KEY (PLAYLIST_ID)
);

CREATE TABLE SONG (
	SONG_ID INT NOT NULL AUTO_INCREMENT,
	TITLE VARCHAR(255) NOT NULL,
    ARTIST_NAMES VARCHAR(255),
    IMAGE	VARCHAR(2000),
	SONG_URL VARCHAR(2000) NOT NULL,
	TAG		VARCHAR(255)
    RELEASE_DATE TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (SONG_ID)
);

CREATE TABLE PLAYLIST_SONG (
	SONG_ID INT,
    PLAYLIST_ID INT,
	PRIMARY KEY (PLAYLIST_ID, SONG_ID)
);

CREATE TABLE ARTIST (
	ARTIST_ID INT NOT NULL AUTO_INCREMENT,
	FULLNAME VARCHAR(255) NOT NULL,
    DESCRIPTION VARCHAR(255),
	IMAGE VARCHAR(255),
    GENDER VARCHAR(10) CHECK (GENDER = N'Nam' OR GENDER = N'Nữ'),
    PRIMARY KEY (ARTIST_ID)
);

CREATE TABLE ALBUM (
	ALBUM_ID INT NOT NULL AUTO_INCREMENT,
    TITLE VARCHAR(255) NOT NULL,
	ARTIST_NAMES VARCHAR(255),
	DESCRIPTION VARCHAR(255),
    IMAGE VARCHAR(255) NOT NULL,
    RELEASE_DATE TIMESTAMP DEFAULT NOW(),
    TOTAL_LISTEN INT,
    PRIMARY KEY (ALBUM_ID)
);

CREATE TABLE ALBUM_SONG (
    ALBUM_ID INT,
    SONG_ID INT,
    PRIMARY KEY (ALBUM_ID, SONG_ID)
);

CREATE TABLE ALBUM_ARTIST (
	ALBUM_ID INT,
    ARTIST_ID INT,
    PRIMARY KEY (ALBUM_ID, ARTIST_ID)
);

CREATE TABLE FAVORITE(
	USER_ID INT,
    SONG_ID INT,
    PRIMARY KEY (USER_ID, SONG_ID)
);

CREATE TABLE BANNER(
	BANNER_ID INT AUTO_INCREMENT,
	IMAGE VARCHAR(255),
	PRIMARY KEY (BANNER_ID)
);

-- FOREIGN KEY

-- USER
ALTER TABLE USER 
ADD CONSTRAINT FK_USER_ROLE
FOREIGN KEY (ROLE_ID) REFERENCES ROLE(ROLE_ID);

-- PLAYLIST
ALTER TABLE PLAYLIST
ADD CONSTRAINT FK_PLAYLIST_USER
FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID);

-- PLAYLIST_SONG
ALTER TABLE PLAYLIST_SONG
ADD CONSTRAINT FK_PLAYLIST_SONG_PLAYLIST
FOREIGN KEY (PLAYLIST_ID) REFERENCES PLAYLIST(PLAYLIST_ID) ON DELETE CASCADE;

ALTER TABLE PLAYLIST_SONG
ADD CONSTRAINT FK_PLAYLIST_SONG_SONG
FOREIGN KEY (SONG_ID) REFERENCES SONG(SONG_ID) ON DELETE CASCADE;

-- ALBUM_SONG
ALTER TABLE ALBUM_SONG
ADD CONSTRAINT FK_ALBUM_SONG_ALBUM
FOREIGN KEY (ALBUM_ID) REFERENCES ALBUM(ALBUM_ID) ON DELETE CASCADE;

ALTER TABLE ALBUM_SONG
ADD CONSTRAINT FK_ALBUM_SONG_SONG
FOREIGN KEY (SONG_ID) REFERENCES SONG(SONG_ID) ON DELETE CASCADE;

-- ALBUM_ARTIST
ALTER TABLE ALBUM_ARTIST
ADD CONSTRAINT FK_ALBUM_ARTIST_ALBUM
FOREIGN KEY (ALBUM_ID) REFERENCES ALBUM(ALBUM_ID);

ALTER TABLE ALBUM_ARTIST
ADD CONSTRAINT FK_ALBUM_ARTIST_ARTIST
FOREIGN KEY (ARTIST_ID) REFERENCES ARTIST(ARTIST_ID);

-- LIKE SONG
ALTER TABLE FAVORITE 
ADD CONSTRAINT FK_FAVORITE_USER
FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID) ON DELETE CASCADE;

ALTER TABLE FAVORITE 
ADD CONSTRAINT FK_FAVORITE_SONG
FOREIGN KEY (SONG_ID) REFERENCES SONG(SONG_ID) ON DELETE CASCADE;

-- ALTER TABLE FAVORITE
-- DROP CONSTRAINT FK_FAVORITE_USER ;

-- INDEXING
CREATE INDEX IDX_SONG ON SONG (TITLE);

SELECT * FROM SONG WHERE TITLE LIKE '%Tu%';

-- END INDEXING
-- insert database

-- INSERT ROLE
SELECT * FROM ROLE;
INSERT INTO ROLE (ROLE_NAME) VALUES 
('Admin'),
('User');

-- INSERT USER
SELECT * FROM USER;
INSERT INTO USER (FULLNAME, EMAIL, PASSWORD, IMAGE, ROLE_ID) VALUES
('Thắng Trần', 'thang@gmail.com', '123456', 'https://static.vecteezy.com/system/resources/previews/001/840/612/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg', 1);

INSERT INTO USER (FULLNAME, EMAIL, PASSWORD, IMAGE) VALUES
('Admin', 'admin@gmail.com', '123456', 'https://static.vecteezy.com/system/resources/previews/001/840/612/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg');



UPDATE USER SET FULLNAME = 'Admin', Email = 'admin@gmail.com', PASSWORD = '123456' WHERE USER_ID = 2; 



-- INSERT ALBUM
select * from album;
INSERT INTO ALBUM(TITLE, ARTIST_NAMES, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES
('Disco V', 'Sơn Tùng, Hoà Minzy, G-Dragon','Âm hưởng Disco trở thành trào lưu của V-Pop ngày nay', 'https://photo-resize-zmp3.zmdcdn.me/w300_r1x1_jpeg/cover/5/6/4/2/564287350da9c16aa401ea18a3c9d2cd.jpg', NOW(), 10);

INSERT INTO ALBUM(TITLE, ARTIST_NAMES, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES
('2000s K-Pop', 'Sơn Tùng, Hoà Minzy, G-Dragon','2000s và những bản Hit K-Pop hay nhất', 'https://photo-resize-zmp3.zmdcdn.me/w300_r1x1_jpeg/cover/2/a/b/8/2ab897cbf80e6aed22a64f19e5ca029f.jpg', NOW(), 2);

INSERT INTO ALBUM(TITLE, ARTIST_NAMES, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES
('Những Bài Hát Hay Nhất Của Sơn Tùng M-TP', 'Sơn Tùng, Hoà Minzy, G-Dragon','Tuyển tập những ca khúc hay nhất của Sơn Tùng M-TP', 'https://photo-resize-zmp3.zmdcdn.me/w300_r1x1_jpeg/cover/3/9/e/c/39ec11680e2b34f7b58d271d468ae763.jpg', NOW(), 5);

INSERT INTO ALBUM(TITLE, ARTIST_NAMES, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES
('Playlist Này Chill Phết', 'Sơn Tùng, Hoà Minzy, G-Dragon','Va vào những giai điệu thư giãn của V-Pop', 'https://photo-resize-zmp3.zmdcdn.me/w300_r1x1_jpeg/cover/4/c/c/c/4ccc7780abb5e8e2de84218f721b7ad3.jpg', NOW(), 3);

INSERT INTO ALBUM(TITLE, ARTIST_NAMES, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES
('Nhẹ Nhàng Cùng V-Pop', 'Sơn Tùng, Hoà Minzy, G-Dragon','Thả mình cùng những giai điệu V-Pop nhẹ nhàng', 'https://photo-resize-zmp3.zmdcdn.me/w300_r1x1_jpeg/cover/2/5/c/f/25cf63ad362dc25bbe7d65a9ae94e803.jpg', NOW(), 3);




-- INSERT SONG
INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES
('Turn it up', 'Amee', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/0/4/e/5/04e561b01b9d88e709199091cba33d50.jpg', 'https://res.cloudinary.com/thangtrn01/video/upload/v1682325132/spotify/songs/turn-it-up_jjxtwn.mp3', NOW()),
('Đi đu đưa đi', 'Bích Phương', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/0/1/8/1/0181fd0a3b9bc53bfb48f7e5e3d9b080.jpg', 'https://res.cloudinary.com/thangtrn01/video/upload/v1682325167/spotify/songs/Di-Du-Dua-Di-Bich-Phuong_oyu2pu.mp3', NOW());

INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES
('Sick Enough To Die', 'MC Mong, Mellow', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/d/8/d817b457b10469fb62deb23890d7ec5b_1415074614.jpg', 'https://res.cloudinary.com/thangtrn01/video/upload/v1682325172/spotify/songs/Sick-Enough-To-Die-MC-Mong-Mellow_lvigp0.mp3', NOW()),
('Haru Haru', 'BIGBANG', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/1/31c0bc178874f507e52ccb8a84812da7_1449720766.jpg', 'https://res.cloudinary.com/thangtrn01/video/upload/v1682325147/spotify/songs/haru-haru_siqnle.mp3', NOW());

INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES
('Lạc Trôi (Masew Mix)', 'Sơn Tùng M-TP, Masew', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/f/a/fa8586e9353a5f80c9d22c63a88d222b_1504987991.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325189/spotify/songs/Lac-Troi-Triple-D-Remix-Son-Tung-M-TP_dig9ig.mp3', 
NOW()),
('Chạy Ngay Đi', 'Sơn Tùng M-TP', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/6/8/b/a68b0bd411adc076ba6c3fb00203a1ee.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325151/spotify/songs/Chay-Ngay-Di-Son-Tung-M-TP_blph4m.mp3', 
NOW()),
('Anh Sai Rồi', 'Sơn Tùng M-TP', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/e/e/ee58fcc0ff45002b8d416bd7685809ce_1487040461.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325174/spotify/songs/Anh-Sai-Roi-Son-Tung-M-TP_mdfhki.mp3', 
NOW()),
('Khuôn Mặt Đáng Thương (Team Sơn Tùng M-TP - Slim V - DJ Trang Moon)', 'Sơn Tùng M-TP', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/0/0/009f6dfa722d23c8a623e67ee714a4ef_1426491999.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325170/spotify/songs/Khuon-Mat-Dang-Thuong-Team-Son-Tung-M-TP-Slim-V-DJ-Trang-Moon-Son-Tung-M-TP_bkvrjo.mp3', 
NOW()),
('Em Của Ngày Hôm Qua (Slim V Remix)', 'Sơn Tùng M-TP', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/4/a40c3d3ebdb380b907546400905b35a0_1470191137.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325187/spotify/songs/Em-Cua-Ngay-Hom-Qua-Slim-V-Remix-Son-Tung-M-TP_e7ouop.mp3', 
NOW());


INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES
('Chuyện Rằng', 'Thịnh Suy', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/9/5/a/e95af77ec80716c1337ba87341f8e08f.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325180/spotify/songs/Chuyen-Rang-Thinh-Suy_gtf4g7.mp3', 
NOW()),
('vaicaunoicokhiennguoithaydoi', 'GREY D, tlinh', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/5/1/e/451edeb56e86f4128d78323957b610ea.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325158/spotify/songs/vaicaunoicokhiennguoithaydoi-GREY-D-tlinh_frukgg.mp3', 
NOW()),
('để tôi ôm em bằng giai điệu này', 'Kai Đinh, MIN, GREY D', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/a/a/8/aaa8da7569916334eb4c73c153b17ad1.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325153/spotify/songs/de-toi-om-em-bang-giai-dieu-nay_m0jwt9.mp3', 
NOW());

INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES
('Một Mình Vẫn Vui', 'Lê Ngọc Châu Anh', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/banner/a/3/8/1/a381bd80ee2365112781ed3309b10001.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325152/spotify/songs/mot-minh-van-vui_akvyiz.mp3', 
NOW()),
('Phải Lòng Anh (Dream Ver.)', 'MIN', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/c/c/a/acca108008c875e64fad124429bce234.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325161/spotify/songs/Phai-Long-Anh-Dream-Ver-MIN_xexnif.mp3', 
NOW()),
('Yêu Thầm (Live Performance)', 'Hoàng Yến Chibi, tlinh, TDK', 
'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/6/9/7/469778b0b4ddc83474eeaf741bdb6ac8.jpg', 
'https://res.cloudinary.com/thangtrn01/video/upload/v1682325179/spotify/songs/yeu-tham_lz18mj.mp3', 
NOW());


-- INSERT ALBUM_SONG
SELECT * FROM ALBUM_SONG;
INSERT INTO ALBUM_SONG(ALBUM_ID, SONG_ID) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(4, 12),
(4, 13),
(4, 14);








-- INSERT FAVORITE
INSERT INTO FAVORITE (USER_ID, SONG_ID) VALUES (1, 1);

-- INSERT PLAYLIST
SELECT * FROM PLAYLIST;

INSERT INTO PLAYLIST (TITLE, IMAGE, USER_ID) VALUES 
('LuonVuiTuoi', 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/4/e/9/0/4e900a56a5dbf90e1f1cab539f68992f.jpg', '1'),
('Vinahey', 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/2/4/5/3/24538985249cd4d3b324b4a4a09ad288.jpg', '1');


-- INSERT PLAYLIST_SONG 
SELECT * FROM PLAYLIST_SONG;
INSERT INTO PLAYLIST_SONG (PLAYLIST_ID, SONG_ID) VALUES
(1, 1),
(1, 2),
(2, 2),
(1, 3),
(1, 4);

-- INSERT BANNER
INSERT INTO BANNER (IMAGE) VALUES
('https://photo-zmp3.zmdcdn.me/banner/d/9/8/d/d98d85c62c2f37d8f564833129f3dfa8.jpg'),
('https://photo-zmp3.zmdcdn.me/banner/5/7/4/0/57408963b27277d478fd073a832f932c.jpg'),
('https://photo-zmp3.zmdcdn.me/banner/3/6/7/d/367d5143a557356c74049b57e2b80c8c.jpg');

-- INSERT ARTIST
INSERT INTO ARTIST (FULLNAME, DESCRIPTION, IMAGE, GENDER)
VALUES 
('Sơn Tùng MTP', 'Nghệ sĩ Vpop', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg', 'Nam'),
('Bích Phương', 'Nghệ sĩ Vpop', 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/6/0/2/7/6027ba87bd6eb8e18a3abf17f651501e.jpg', 'Nữ');

-- INSERT ALBUM_ARTIST
INSERT INTO ALBUM_ARTIST (ALBUM_ID, ARTIST_ID)
VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 2);

-- END INSERT

-- SELECT S.*, PLS.PLAYLIST_ID FROM SONG S
-- INNER JOIN PLAYLIST_SONG PLS ON PLS.SONG_ID = S.SONG_ID
-- INNER JOIN PLAYLIST P ON PLS.PLAYLIST_ID = P.PLAYLIST_ID
-- WHERE P.USER_ID = 1;

