/*
 Navicat Premium Data Transfer

 Source Server         : freelance_be
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : db_be

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 01/03/2022 15:45:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'genarate by base',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enc_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telephone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'เพศ( 0 = ชาย , 1 = หญิง )',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (2, 'admin116', '$2b$10$ukeZDi3PBXZ.3CNshH7Xm.aj.ABHI1OOyLUP8HL8dUVWI.Tz6Yy92', 'test', 'test', '0999999999', '0', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'genarate by base',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enc_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `department_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'คำอธิบาย หรือ หมายเหตุ',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, 'depart1', '$2b$10$RfKN/EsdkaUXkTt1pWJ93.QPKD0mYM7tBCZSX7rjDGwxHFWhOSBXq', 'test1', 'test', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'genarate by base',
  `rfid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `equipment_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ยี่ห้อ',
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'รุ่น',
  `equipment_number` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'หมายเลขครุภัณฑ์',
  `serial_number` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 's/n',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'คำอธิบาย หรือ หมายเหตุ',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of equipment
-- ----------------------------
INSERT INTO `equipment` VALUES (1, '1', 'test', 'test', 'test1234', '1', '1', 'test', '1', '2022-01-28 11:27:16', '1', '2022-01-27 11:27:16', 1);
INSERT INTO `equipment` VALUES (2, '2', 'test', 'test', 'test1234', '2', '2', 'test', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);
INSERT INTO `equipment` VALUES (3, '3', 'test1', 'test1', 'test12345', '3', '3', 'test', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);
INSERT INTO `equipment` VALUES (4, '3123', 'test1', 'test1', 'test12345', '3', '3', 'test', '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'genarate by base',
  `rfid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'id พนักงาน',
  `enc_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telephone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'เพศ( 0 = ชาย , 1 = หญิง )',
  `image_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ชื่อไฟล์',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_at` datetime NOT NULL,
  `update_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES (1, '1', '1', '$2b$10$yv2GSlpGgvRZRTOMR./.gOflf.4LqKA1FvQDxRfD50s3lZTJLFJrS', 'test', 'test', '0888888888', '0', NULL, '1', '2022-01-28 11:27:16', '1', '2022-02-11 11:27:16', 1);
INSERT INTO `member` VALUES (2, '2', '2', '$2b$10$8S0OwyzxEHIOSYok6pBBOOLSoC/ROtUqGRg93bkntSR9BmlVbIrfW', 'test1', 'test1', '0999999999', '0', NULL, '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);
INSERT INTO `member` VALUES (3, '3', '3', '$2b$10$HbXAp0ZSm0xYiw.9IVczmOvDKSf4TPTnaTodz5XON/DoyhnET.Ulm', 'test', 'test', '0999999999', '0', NULL, '1', '2022-01-28 11:27:16', '1', '2022-01-28 11:27:16', 1);

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `report_id` int NULL DEFAULT NULL,
  `read_noti` int NOT NULL COMMENT '0 = ยังไม่อ่าน, 1 = อ่านแล้ว',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (3, 1, 0, '2022-02-25 21:06:14', '2022-02-25 21:06:14', 1);
INSERT INTO `notification` VALUES (4, 5, 0, '2022-02-25 21:06:34', '2022-02-25 21:06:34', 1);

-- ----------------------------
-- Table structure for reports
-- ----------------------------
DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'genarate by base',
  `member_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'คนที่ยืม/คืน ',
  `equipment_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ครุภัณฑ์',
  `status` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'สถานะ( 0 = กำลังใช้งาน(หรือถูกยืม) , 1 = คืนแล้ว ) ',
  `used_department_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ครุภัณฑ์ถูกใช้ในแผนกอะไร',
  `admin_approve_borrow` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'คนอนุมัติการยืม',
  `borrow_date` datetime NOT NULL COMMENT 'วันที่ยืม',
  `admin_approve_return` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'คนอนุมัติการคืน',
  `return_date` datetime NULL DEFAULT NULL COMMENT 'วันที่คืน',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reports
-- ----------------------------
INSERT INTO `reports` VALUES (1, '1', '2', '0', '1', '1', '2022-02-22 09:27:16', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);
INSERT INTO `reports` VALUES (2, '2', '1', '1', NULL, '1', '2022-02-22 16:27:16', '2', '2022-02-11 11:27:16', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);
INSERT INTO `reports` VALUES (5, '3', '3', '0', NULL, '1', '2022-02-25 14:27:16', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);
INSERT INTO `reports` VALUES (6, '1', '1', '0', NULL, '1', '2022-02-12 11:27:16', NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

SET FOREIGN_KEY_CHECKS = 1;
