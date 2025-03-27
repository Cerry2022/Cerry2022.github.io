---
date: 2024-10-09
title: Linux下使用信号量的案例
category: 主题
tags:
  - linux
description: DeepSeek给出的Linux下使用信号量机制的案例
---
### 示例代码：使用信号量同步线程

```c
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

sem_t sem;  // 定义信号量

void* thread_func1(void* arg) {
    printf("线程1：等待信号量...\n");
    sem_wait(&sem);  // 等待信号量
    printf("线程1：获得信号量，执行任务...\n");
    sleep(2);  // 模拟任务执行
    printf("线程1：任务完成，释放信号量...\n");
    sem_post(&sem);  // 释放信号量
    return NULL;
}

void* thread_func2(void* arg) {
    printf("线程2：等待信号量...\n");
    sem_wait(&sem);  // 等待信号量
    printf("线程2：获得信号量，执行任务...\n");
    sleep(1);  // 模拟任务执行
    printf("线程2：任务完成，释放信号量...\n");
    sem_post(&sem);  // 释放信号量
    return NULL;
}

int main() {
    pthread_t thread1, thread2;

    // 初始化信号量，初始值为1，表示最多允许一个线程访问共享资源
    sem_init(&sem, 0, 1);

    // 创建两个线程
    pthread_create(&thread1, NULL, thread_func1, NULL);
    pthread_create(&thread2, NULL, thread_func2, NULL);

    // 等待两个线程完成
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    // 销毁信号量
    sem_destroy(&sem);

    printf("主线程：所有任务完成。\n");

    return 0;
}

```

### 解释：

1. **`sem_init()`**：用于初始化信号量。第二个参数为 0，表示这是在线程之间使用的信号量。第三个参数表示信号量的初始值，在此例中设置为 1，表示最多一个线程可以访问共享资源。
2. **`sem_wait()`**：减少信号量的值。如果信号量的值为 0，则线程会被阻塞，直到有其他线程释放信号量。
3. **`sem_post()`**：增加信号量的值，释放信号量，允许其他被阻塞的线程继续执行。
4. **`sem_destroy()`**：销毁信号量，清理资源。

### 运行步骤：

1. 将代码保存为 `semaphore_example.c`。
2. 在终端中编译并运行：
    
    `gcc -o semaphore_example semaphore_example.c -lpthread ./semaphore_example`
    

### 进一步学习：

- 你可以深入学习POSIX信号量及其在多线程编程中的应用。推荐阅读《Linux多线程编程指南》，其中详细介绍了线程同步机制的使用。
- 如果想进一步了解进程间通信的其他方式，如管道、共享内存等，可以参考《Unix网络编程》（W. Richard Stevens），该书深入剖析了进程通信机制。