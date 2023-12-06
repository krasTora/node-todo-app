INSERT INTO
	todo_t_task(
		task_name
		, complete_flg
		, create_user
		, create_date
		, update_user
		, update_date
	)
VALUES (
	$1
	, $2
	, $3
	, current_timestamp
	, $4
	, current_timestamp
);