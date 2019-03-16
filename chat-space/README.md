# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

ruby 2.5.1p57 (2018-03-29 revision 63029)
* System dependencies

* Configuration

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true,index: true|
|email|text|null: false,unique: true|
|password|string|null: false,unique: true|

### Association
- has_many :messages
- has_many :groups through: :members
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false,unique: true|
|creatid_at|timestamp|


### Association
- has_many :messages
- has_many :users through: :members
- has_many :members



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|creatid_at|timestamp|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belong_to :user
- belong_to :group


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
