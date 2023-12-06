-- drop文
-- DROP TABLE todo_t_task;

CREATE TABLE todo_t_task (
	task_name varchar(1000) NOT NULL
	, complete_flg varchar(1)
	, create_user varchar(1000)
	, create_date timestamp(6)
	, update_user varchar(1000)
	, update_date timestamp(6)
);
COMMENT ON TABLE todo_t_task IS 'タスク';
COMMENT ON COLUMN todo_t_task.task_name IS 'タスク名';
COMMENT ON COLUMN todo_t_task.complete_flg IS '完了フラグ';
COMMENT ON COLUMN todo_t_task.create_user IS '作成者';
COMMENT ON COLUMN todo_t_task.create_date IS '作成日時';
COMMENT ON COLUMN todo_t_task.update_user IS '更新者';
COMMENT ON COLUMN todo_t_task.update_date IS '更新日時';