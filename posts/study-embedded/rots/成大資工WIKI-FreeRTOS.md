---
date: 2025-12-01 16:09
title: 成大資工WIKI-FreeRTOS
category:
tags:
  - RTOS
description:
modifyDate: 2025-12-01 16:58
---


> [!info]
> 以下内容来自 成大資工WIKI <a href="https://wiki.csie.ncku.edu.tw/embedded/freertos" style="cursor: pointer !important; user-select: none !important;">FreeRTOS</a> 原文为繁体，已转为简体，便于大家学习


协作者
---
* 2015 年春季
   - [萧奕凯](https://github.com/fbukevin), [张玮豪](https://github.com/parkson1128), [余志伟](https://github.com/peter1yu), [王皓昱](https://github.com/larrywhy), [洪炜凯](https://github.com/WaiKevin)
* 2014 年春季
   - [梁颖睿](https://github.com/TheKK), [李奇霖](https://github.com/Shinshipower), [方威迪](https://github.com/waynew30777), [陈盈伸](https://github.com/shin21)

共笔
---
* 2015 年春季
   - [Hackpad](https://hackpad.com/2015-Embedded-FreeRTOS-0IEDUa7Rjct)
   - [GitHub](https://github.com/Justinsanity/freertos-basic)
* 2014 年春季
  - [Hackpad](https://hackpad.com/FreeRTOSV8.0.0-PU3awKuzHz6#:h=%3Chardware-interfacing%3E)
  - [GitHub](https://github.com/TheKK/myFreeRTOS)

目录
---
* [FreeRTOS 架构](#FreeRTOS 架构)
* [原始码](#原始码)
* [命名规则](#命名规则)
* [Run FreeRTOS on STM32F4-Discovery](#Run FreeRTOS on STM32F4-Discovery)
* [任务](#任务)
* [Ready list 的资料形态](#Ready list 的资料形态)
* [通讯](#通讯)
* [排程](#排程)
* [中断处理](#中断处理)
* [硬体驱动](#硬体驱动)
* [效能评估](#效能评估)
* [测试环境架设](#测试环境架设)
* [问题讨论一](#问题讨论一)
* [问题讨论二](#问题讨论二)
* [参考资料](#参考资料)

FreeRTOS 架构
-----------
官方网站：[https://www.freertos.org/](https://www.freertos.org/)

FreeRTOS 是一个相对其他作业系统而言较小的作业系统。最小化的 FreeRTOS 核心仅包括 3 个 .c 文件(tasks.c、queue.c、list.c)和少数标头档，总共不到 9000 行程式码，还包括了注解和空行。一个典型的编译后 binary（二进位码）小于 10 KB。

FreeRTOS 的程式码可以分为三个主要区块：任务、通讯和硬体界面。

* 任务 (Task): FreeRTOS 的核心程式码约有一半是用来处理多数作业系统首要关注的问题：任务，任务是拥有优先权的用户所定义的 C 函数。task.c 和 task.h 负责所有关于建立、排程和维护任务的繁重工作。

* 通讯 (Communication): 任务很重要，不过任务间可以互相通讯则更为重要！它带出了 FreeRTOS 的第二项议题：通讯。FreeRTOS 核心程式码大约有 40% 是用来处理通讯的。queue.c 和 queue.h 负责处理 FreeRTOS 的通讯，任务和中断(interrupt)使用伫列(伫列，queue)互相发送数据，并且使用 semaphore 和 mutex 来派发 critical section 的使用信号。

* 硬体界面：有近 9000 行的程式码组成基本的 FreeRTOS，这部份是与硬体无关的(hardware-independent)，同一份程式码在不同硬体平台上的 FreeRTOS 都可以运行。大约有 6% 的 FreeRTOS 核心代码，在与硬体无关的 FreeRTOS 核心和与硬体相关的程式码间扮演著垫片([shim](http://en.wikipedia.org/wiki/Shim_%28computing%29))的角色。我们将在下个部分讨论与硬体相关的程式码。[#]_

用 [cloc](http://cloc.sourceforge.net/) 统计 FreeRTOS 8.0.0 的 include/ *.c portable/GCC/ARM_CM4F/ 等目录，可得不含注解、空白行的行数为 6566，而统计与平台有关的部份 (portable/GCC/ARM_CM4F/ 目录)，则是 435 行。计算可得: 435 / 6566 = 0.06625 = 6%，与描述相符，但原本的 9000 行是指含注解的说法 (实际为 8759 行)


原始码
------------------
* 官方下载：[https://freertos.org/a00104.html](https://freertos.org/a00104.html)
* 最新版本：v11.0.0

* 核心程式码：(Source)
  - tasks.c：主要掌管 task 的档案
  - queue.c：管理 task 间 communication (message queue 的概念)
  - list.c：提供系统与应用实作会用到的 list 资料结构

        - 选择性档案：timer.c、croutine.c (co-routine)、event_groups.c

* 与硬体相关的档案：以 ARM Cortext-M3 为例，可在 Source/portable/GCC/ARM_CM3 中找到
  - portmacro.h：定义了与硬体相关的变数，如资料型态定义，以及与硬体相关的函式呼叫名称定义(以 portXXXXX 命名)等，统一各平台的函式呼叫
  - port.c：定义了包含与硬体相关的程式码实作
  - FreeRTOSConfig.h：包含 clock speed, heap size, mutexes 等等都在此定义(需自行建立)

[回目录](#目录)

资料型态及命名规则
---------
在不同硬体装置上，通讯埠设定上也不同，定义在`portmacro.h`标头档内，有两种特殊资料型态portTickType以及portBASE_TYPE。

* 资料型态
  - portTickType  : 用以储存tick的计数值，可以用来判断block次数
  - portBASE_TYPE : 定义为架构基础的变数，随各不同硬体来应用，如在32-bit架构上，其为32-bit型态，最常用以储存极限值或布林数。

FreeRTOS明确的定义变数名称以及资料型态，不会有unsigned以及signed搞混使用的情形发生。

* 变数
  - char 类型：以 c 为字首
  - short 类型：以 s 为字首
  - long 类型：以 l 为字首
  - float 类型：以 f 为字首
  - double 类型：以 d 为字首
  - Enum 变数：以 e 为字首
  - portBASE_TYPE 或其他（如 struct）：以 x 为字首
  - pointer 有一个额外的字首 p , 例如 short 类型的 pointer 字首为 ps
  - unsigned 类型的变数有一个额外的字首 u , 例如 unsigned short 类型的变数字首为 us 

* 函式：以回传值型态与所在档案名称为开头(prefix)
  - vTaskPriority() 是 task.c 中回传值型态为 void 的函式
  - xQueueReceive() 是 queue.c 中回传值型态为 portBASE_TYPE 的函式
  - 只能在该档案中使用的 (scope is limited in file) 函式，以 prv 为开头 (private)

* 巨集名称：巨集在FreeRTOS里皆为大写字母定义，名称前小写字母为巨集定义的地方
  - portMAX_DELAY 			: portable.h
  - configUSE_PREEMPTION	: FreeRTOSConfig.h

一般巨集回传值定义pdTRUE 及 pdPASS为1 , pdFALSE 及 pdFAIL 为0。


Run FreeRTOS on STM32F4-Discovery
--------------------------------------------------------

[回目录](#目录)

任务
----------
任务 (task) 是在 FreeRTOS 中执行的基本单位，每个 task 都是由一个 C 函数所组成，意思是你需要先定义一个 C 的函数，然后再用 xTaskCreate() 这个 API 来建立一个 task，这个 C 函数有几个特点，它的返回值必须是 void，其中通常会有一个无限回圈，所有关于这个 task 的工作都会在回圈中进行，而且这个函数不会有 return，FreeRTOS 不允许 task 自行结束(使用 return 或执行到函数的最后一行)

Task 被建立出来后，它会配置有自己的堆叠空间和 stack variable(就是 function 中定义的变数)

一个典型的 task function 如下：

```c

    void ATaskFunction(void *pvParameters)
    {
       int i = 0;   // 每个用这个函数建立的 task 都有自己的一份 i 变数

       while(1)
       { /* do something here */ }

       /* 
        * 如果你的 task 就是需要离开 loop 并结束
        * 需要用 vTaskDelete 来删除自己而非使用 return 或自然结束(执行到最后一行)
        * 这个参数的 NULL 值是表示自己 
        */
       vTaskDelete(NULL);
    }
```

Task 的状态
![](https://wiki.csie.ncku.edu.tw/tskstate.gif)

  * Ready：准备好要执行的状态
  * Running：正在由 CPU 执行的状态
  * Blocked：等待中的状态(通常是在等待某个事件)
  * Suspended：等待中的状态(透过 API 来要求退出排程)

Blocked  vs  Suspended

* blocked 是说如果有个 task 将要等待某个目前无法取得的资源(被其他 task 占用中)，则会被设为 blocked 状态，这是被动的，OS 会呼叫 blocking API 来设定 task 进入 blocked queue

* suspended 与 blocked 的差异在于，suspended 是 task 主动呼叫 API 来要求让自己进入暂停状态的


每一种状态 FreeRTOS 都会给予一个 list 储存（除了 running)

* 建立 task 的函数

``` c
    
    portBASE_TYPE xTaskCreate( pdTASK_CODE pvTaskCode,
                               const signed portCHAR * const pcName,
                               unsigned portSHORT usStackDepth,
                               void *pvParameters,
                               unsigned portBASE_TYPE uxPriority,
                               xTaskHandle *pxCreatedTask );
```

  * pvTaskCode：就是我们定义好用来建立 task 的 C 函数
  * pcName：任意给定的 task name，这个名称只被用来作识别，不会在 task 管理中被采用
  * usStackDepth：堆叠的大小
  * pvParameters：要传给 task 的参数阵列，也就是我们在 C 函数宣告的参数
  * uxPriority：定义这个任务的优先权，在 FreeRTOS 中，0 最低，(configMAX_PRIORITIES – 1) 最高
  * pxCreatedTask：[handle](http://zh.wikipedia.org/wiki/%E5%8F%A5%E6%9F%84)，是一个被建立出来的 task 可以用到的识别符号

* 删除 task 的函数

``` c
    
    void vTaskDelete( xTaskHandle pxTaskToDelete );
```
  * pxTaskToDelete: 利用handle去识别出哪一个task。
这种可能性存在于如果在 loop 中发生执行错误 (fail)，则需要跳出回圈并终止(自己)执行，此时就需要使用 vTaskDelete 来删除自己，发生错误的例子：
    1. 假如今天一个 task 是要存取资料库，但是资料库或资料表不存在，则应该结束 task
    2. 假如今天一个 client task 是要跟 server 做连线( listening 就是 loop)，却发现 client 端没有网路连线，则应结束 task
	


Ready list 的资料形态
---------------------

FreeRTOS 使用 ready list 去管理准备好要执行的 tasks，而 ready list 的资料储存方式如下图

![](https://wiki.csie.ncku.edu.tw/freertos-figures-full-ready-list-2.png)

OS 会在进行 context switch 时选出下一个欲执行的 task

下面是在 ready list 中依照优先权选取执行目标的程式部分，FreeRTOS 的优先权最小为 0，数字越大则优先权越高

[task.c](https://github.com/TheKK/myFreeRTOS/blob/master/tasks.c#L284) 

``` c

    #define taskSELECT_HIGHEST_PRIORITY_TASK()														
    {
        /* 选出含有 ready task 的最高优先权 queue */								
        while( listLIST_IS_EMPTY( &( pxReadyTasksLists[ uxTopReadyPriority ] ) ) )						
        {																								
            configASSERT( uxTopReadyPriority );	     //如果找不到则 assert exception														
            --uxTopReadyPriority;																		
        }																								
    																									
        /* listGET_OWNER_OF_NEXT_ENTRY indexes through the list, so the tasks of						
           the same priority get an equal share of the processor time. */									
           listGET_OWNER_OF_NEXT_ENTRY( pxCurrentTCB, &( pxReadyTasksLists[ uxTopReadyPriority ] ) );		
    } 
```

从前面的图我们可以知道一个 ready task list 中的每个索引各自指向了一串 task list，所以 listGET_OWNER_OF_NEXT_ENTRY 就是在某个 ready task list 索引中去取得其中 task list 里某个 task 的 TCB

[include/list.h](https://github.com/TheKK/myFreeRTOS/blob/master/include/list.h#L268)

``` c
    #define listGET_OWNER_OF_NEXT_ENTRY( pxTCB, pxList )
    {
        List_t * const pxConstList = ( pxList );
        /* Increment the index to the next item and return the item, ensuring */
        /* we don't return the marker used at the end of the list.  */
        ( pxConstList )->pxIndex = ( pxConstList )->pxIndex->pxNext; 
        if( ( void * ) ( pxConstList )->pxIndex == ( void * ) &( ( pxConstList )->xListEnd ) )  \
        {
            ( pxConstList )->pxIndex = ( pxConstList )->pxIndex->pxNext;
        }
        ( pxTCB ) = ( pxConstList )->pxIndex->pvOwner;
    }
```


* Task Control Block (TCB)的资料结构([tasks.c](https://github.com/TheKK/myFreeRTOS/blob/master/tasks.c#L120))

``` c

    /* In file: tasks.c */
    typedef struct tskTaskControlBlock
    {
        volatile portSTACK_TYPE *pxTopOfStack;                  /* 指向 task 记忆体堆叠最后一个项目的位址，这必须是 struct 中的第一个项目 (有关 offset) */
        xListItem    xGenericListItem;                          /* 用来记录 task 的 TCB 在 FreeRTOS ready 和 blocked queue 的位置 */
        xListItem    xEventListItem;                            /* 用来记录 task 的 TCB 在 FreeRTOS event queue 的位置 */
        unsigned portBASE_TYPE uxPriority;                      /* task 的优先权 */
        portSTACK_TYPE *pxStack;                                /* 指向 task 记忆体堆叠的起始位址 */
        signed char    pcTaskName[ configMAX_TASK_NAME_LEN ];   /* task 被建立时被赋予的有意义名称(为了 debug 用)*/
    	
        #if ( portSTACK_GROWTH > 0 )
        portSTACK_TYPE *pxEndOfStack;                           /* stack overflow 时作检查用的 */
        #endif
    	
        #if ( configUSE_MUTEXES == 1 )
        unsigned portBASE_TYPE uxBasePriority;                  /* 此 task 最新的优先权 */
        #endif
    } tskTCB;
```

 - pxTopOfStack , pxEndOfStack：记录 stack 的大小
 - uxPriority , uxBasePriority：前者记录目前的优先权 ,后者记录原本的优先权（可能发生在 Mutex)
 - xGenericListItem , xEventListItem：当一个任务被放入 FreeRTOS 的一个列表中，FreeRTOS 在 TCB 中插入指向这个任务的 pointer 的地方

xTaskCreate() 函数被呼叫的时候，一个任务会被建立。FreeRTOS 会为每一个任务分配一个新的 TCB target，用来记录它的名称、优先权和其他细节，接著配置用户所请求的 HeapStack 空间（假设有足够使用的记忆体），并在 TCB 的 pxStack 成员中记录 Stack 的记忆体起始位址。

* 配置TCB及stack的函式 - prvAllocateTCBAndStack()([tasks.c](https://github.com/embedded2015/freertos-basic/blob/master/freertos/libraries/FreeRTOS/tasks.c#L359))

``` c

    
    /* stack 记忆体由高到低 */
    #if( portSTACK_GROWTH > 0 ) 
    {
            /* pvPortMalloc 就是做记忆体配置*/
            pxNewTCB = ( TCB_t * ) pvPortMalloc( sizeof( TCB_t ) );

            /* 如果pxNewTCB为空*/
            if( pxNewTCB != NULL ) 
            {
                    /* 做记忆体对齐动作  */
                    pxNewTCB->pxStack = ( StackType_t * ) pvPortMallocAligned( ( ( ( size_t ) usStackDepth ) * sizeof( StackType_t ) ), puxStackBuffer );

                    /* Stack 仍为NULL的话，则删除TCB，并且指向NULL */
                    if( pxNewTCB->pxStack == NULL )
                    {
                            
                            vPortFree( pxNewTCB );
                            pxNewTCB = NULL;
                    }
            }
    }
```

在进行pvPortMalloc时候，会先进行vTaskSuspendAll(); ，借由不发生context swiitch的swap out动作，配置记忆体空间，等到配置完成再呼叫xTaskResumeAll(); 

* pvPortMalloc在port.c里面定义，基本上就是做记忆体配置，根据各不同port去实作pvPortMalloc。
* pvPortMallocAligned在在FreeRTOS.h里面可以看到define为如果判断未配置空间，则进行pvPortMalloc，如果有则直接使用puxStackBuffer。



* 硬体层次的设定

为了便于排程，创造新 task 时，stack 中除了该有的资料外，还要加上『空的』 register 资料(第一次执行时理论上 register 不会有资料)，让新 task 就像是被 context switch 时选的 task 一样，依照前述变数的命名规则，下面是实作方式
 
[portable/GCC/ARM_CM4F/port.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L216)
``` c

    /* In file: port.c */
    StackType_t *pxPortInitialiseStack( StackType_t *pxTopOfStack, TaskFunction_t pxCode, void  *pvParameters )
    {
    
    /* Simulate the stack frame as it would be created by a context switch
        interrupt. */

        /* Offset added to account for the way the MCU uses the stack on entry/exit
        of interrupts, and to ensure alignment. */
        pxTopOfStack--;

        *pxTopOfStack = portINITIAL_XPSR;	/* xPSR */
        pxTopOfStack--;
        *pxTopOfStack = ( StackType_t ) pxCode;	/* PC */
        pxTopOfStack--;
        *pxTopOfStack = ( StackType_t ) portTASK_RETURN_ADDRESS;	/* LR */

        /* Save code space by skipping register initialisation. */
        pxTopOfStack -= 5;	/* R12, R3, R2 and R1. */
        *pxTopOfStack = ( StackType_t ) pvParameters;	/* R0 */

        /* A save method is being used that requires each task to maintain its
        own exec return value. */
        pxTopOfStack--;
        *pxTopOfStack = portINITIAL_EXEC_RETURN;

        pxTopOfStack -= 8;	/* R11, R10, R9, R8, R7, R6, R5 and R4. */

        return pxTopOfStack;
    }
```
在 TCB 完成初始化后，要把该 TCB 接上其他相关的 list，这个过程中必须暂时停止 interrupt 功能，以免在 list 还没设定好前就被中断设定(例如 systick)


而 ARM Cortex-M4 处理器在 task 遇到中断时，会将 register 的内容 push 进该 task 的 stack 的顶端，待下次执行时再 pop 出去，以下是在 port.c 里的实作

[portable/GCC/ARM_CM4F/port.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L450)

``` c

    /* In file: port.c */
    void xPortPendSVHandler( void )
    {
    	/* This is a naked function. */
    
    	__asm volatile
    	(
    	"	mrs r0, psp						\n" // psp: Process Stack Pointer
    	"	isb							\n"
    	"								\n"
    	"	ldr	r3, pxCurrentTCBConst				\n" /* Get the location of the current TCB. */
    	"	ldr	r2, [r3]					\n"
    	"								\n" // tst used "and" to test.
    	"	tst r14, #0x10						\n" /* Is the task using the FPU context?  If so, push high vfp registers. */
    	"	it eq							\n"
    	"	vstmdbeq r0!, {s16-s31}					\n"
    	"								\n" // stmdb: db means "decrease before"
    	"	stmdb r0!, {r4-r11, r14}				\n" /* Save the core registers. */
    	"								\n"
    	"	str r0, [r2]						\n" /* Save the new top of stack into the first member of the TCB. */
    	"								\n"
    	"	stmdb sp!, {r3}						\n"
    	"	mov r0, %0 						\n"
    	"	msr basepri, r0						\n"
    	"	bl vTaskSwitchContext					\n"
    	"	mov r0, #0						\n"
    	"	msr basepri, r0						\n"
    	"	ldmia sp!, {r3}						\n" // r3 now is switched to the higher priority task
    	"								\n"
    	"	ldr r1, [r3]						\n" /* The first item in pxCurrentTCB is the task top of stack. */
    	"	ldr r0, [r1]						\n" // this r0 is "pxTopOfStack"
    	"								\n"
    	"	ldmia r0!, {r4-r11, r14}				\n" /* Pop the core registers. */
    	"								\n"
    	"	tst r14, #0x10						\n" /* Is the task using the FPU context?  If so, pop the high vfp registers too. */
    	"	it eq							\n"
    	"	vldmiaeq r0!, {s16-s31}					\n"
    	"								\n"
    	"	msr psp, r0						\n"
    	"	isb							\n"
    	"								\n"
    	#ifdef WORKAROUND_PMU_CM001 /* XMC4000 specific errata workaround. */
    		#if WORKAROUND_PMU_CM001 == 1
    	"			push { r14 }				\n"
    	"			pop { pc }				\n"
    		#endif
    	#endif
    	"								\n"
    	"	bx r14							\n"
    	"								\n" //number X must be a power of 2. That is 2, 4, 8, 16, and so on...
    	"	.align 2						\n" //on a memory address that is a multiple of the value X
    	"pxCurrentTCBConst: .word pxCurrentTCB	\n"
    	::"i"(configMAX_SYSCALL_INTERRUPT_PRIORITY)
    	);
    }
    ```


Interrupt 的实作，是将 CPU 中控制 interrupt 权限的暂存器(basepri)内容设为最高，此时将没有任何 interrupt 可以被呼叫，该呼叫的函数名称为 ulPortSetInterruptMask()

[portable/GCC/ARM_CM4F/port.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L419)

``` c

    __attribute__(( naked )) uint32_t ulPortSetInterruptMask( void )
    {
            __asm volatile
            (
                    "        mrs r0, basepri        \n"
                    "        mov r1, %0             \n"
                    "        msr basepri, r1        \n"
                    "        bx lr                  \n"
                    :: "i" ( configMAX_SYSCALL_INTERRUPT_PRIORITY ) : "r0", "r1"
            );

            /* This return will not be reached but is necessary to prevent compiler
            warnings. */
            return 0;
```

借此 mask 遮罩掉所有的 interrupt (所有优先权低于 configMAX_SYSCALL_INTERRUPT_PRIORITY 的 task 将无法被执行)

参照：[http://www.freertos.org/RTOS-Cortex-M3-M4.html](http://www.freertos.org/RTOS-Cortex-M3-M4.html)

当使用 vTaskCreate() 将 task 被建立出来以后，需要使用 vTaskStartScheduler() 来启动排程器决定让哪个 task 开始执行，当 vTaskStartScheduler() 被呼叫时，会先建立一个 idle task，这个 task 是为了确保 CPU 在任一时间至少有一个 task 可以执行 (取代直接切换回 kernel task) 而在 vTaskStartScheduler() 被呼叫时自动建立的 user task，idle task 的 priority 为 0 (lowest)，目的是为了确保当有其他 user task 进入 ready list 时可以马上被执行

vTaskStartScheduler ([tasks.c](https://github.com/Justinsanity/freertos-basic/blob/v8.2.1/freertos/libraries/FreeRTOS/tasks.c#L1543))

``` c

    /* Add the idle task at the lowest priority. */
    #if ( INCLUDE_xTaskGetIdleTaskHandle == 1 )
    {
        /* Create the idle task, storing its handle in xIdleTaskHandle so it can
        be returned by the xTaskGetIdleTaskHandle() function. */
        xReturn = xTaskCreate( prvIdleTask, "IDLE", tskIDLE_STACK_SIZE, ( void * ) NULL, ( tskIDLE_PRIORITY | portPRIVILEGE_BIT ), &xIdleTaskHandle ); /*lint !e961 MISRA exception, justified as it is not a redundant explicit cast to all supported compilers. */
    }
    #else
    {
        /* Create the idle task without storing its handle. */
        xReturn = xTaskCreate( prvIdleTask, "IDLE", tskIDLE_STACK_SIZE, ( void * ) NULL, ( tskIDLE_PRIORITY | portPRIVILEGE_BIT ), NULL );  /*lint !e961 MISRA exception, justified as it is not a redundant explicit cast to all supported compilers. */
    }
    #endif /* INCLUDE_xTaskGetIdleTaskHandle */
```

接著才呼叫 xPortStartScheduler() 去执行 task

* Blocked

Task 的 blocked 状态通常是 task 进入了一个需要等待某事件发生的状态，这个事件通常是执行时间到了(例如 systick interrupt)或是同步处理的回应，如果像一开始的 ATaskFunciton() 中使用 while(1){} 这样的无限回圈来作等待事件，会占用 CPU 运算资源，也就是 task 实际上是在 running，但又没做任何事情，占用著资源只为了等待 event，所以比较好的作法是改用 vTaskDelay()，当 task 呼叫了 vTaskDelay()，task 会进入 blocked 状态，就可以让出 CPU 资源了

使用 infinite loop 的执行时序图

![](https://wiki.csie.ncku.edu.tw/loop_blocked.png)

使用 vTaskDelay() 的执行时序图

![](https://wiki.csie.ncku.edu.tw/delay_blocked.png)


  * vTaskDelay()：这个函式的参数如果直接给数值，是 ticks，例如 vTaskDelay(250) 是暂停 250 个 ticks 的意思，由于每个 CPU 的一个 tick 时间长度不同，FreeRTOS 提供了 portTICK_RATE_MS 这个巨集常数，可以帮我们转换 ticks 数为毫秒 (ms)，也就是说 vTaskDelay( 250/portTICK_RATE_MS ) 这个写法，就是让 task 暂停 250 毫秒(ms)的意思 (v8.2.1 改名为 portTICK_PERIOD_MS)

* Suspended

如果一个 task 会有一段时间不会执行，那就可以进入 suspend 状态。

例如有个 task 叫做 taskPrint，只做 print 资料，而有好几个 operation 负责做运算，若运算要很久，则可以把 taskPrint 先丢入 suspend 状态中，直到所有运算皆完成后，再唤醒 taskPrint 进入 ready 状态，最后将资料 print 出来

vTaskSuspend 使用范例：

 ``` c

     void vAFunction( void )

     {

         TaskHandle_t xHandle;

         // Create a task, storing the handle.

         xTaskCreate( vTaskCode, "NAME", STACK_SIZE, NULL, tskIDLE_PRIORITY, &xHandle );

         // ... 

         // If xHandle will wait for a long time.

         // Use the handle to suspend the created task.

         vTaskSuspend( xHandle );

         // ...

         // The created task will not run during this period, unless

         // another task calls vTaskResume( xHandle ).

         //...

         // Suspend ourselves.

         vTaskSuspend( NULL );

         // We cannot get here unless another task calls vTaskResume

         // with our handle as the parameter.

     }
 ```

[回目录](#目录)

通讯
----------------------

在 FreeRTOS 中，task 之间的沟通是透过把资料传送到 queue 和读取 queue 中资料实现的

* Queue

![](https://wiki.csie.ncku.edu.tw/qu.png)

FreeRTOS 的 task 预设是采用 deep copy 的方式来将资料送到 queue 中，也就是会把资料按照字元一个一个复制一份到 queue 中，当要传递的资料很大时，建议不要这样传递，改采用传递资料指标的方式，如 shallow copy。好处是可以直接做大资料复制，缺点就是会影响到记忆体内容。不管你选择哪一个方式放入 queue 中，FreeRTOS 只关心 data 的大小，不关心是哪一种 data copy 的方式。

* Shallow Copy 

![](https://wiki.csie.ncku.edu.tw/shallow_copy.png)

* Deep Copy


![](https://wiki.csie.ncku.edu.tw/deep_copy.png)

* Queue 的结构

[queue.c](https://github.com/Justinsanity/freertos-basic/blob/v8.2.1/freertos/libraries/FreeRTOS/queue.c#L130)


``` c

    /* In file: queue.c */
    typedef struct QueueDefinition{

      signed char *pcHead;                    /* Points to the beginning of the queue 
                                                 storage area. */

      signed char *pcTail;                    /* Points to the byte at the end of the 
                                                 queue storage area. One more byte is 
                                                 allocated than necessary to store the 
                                               queue items; this is used as a marker. */

      signed char *pcWriteTo;                 /* Points to the free next place in the 
                                                 storage area. */

      signed char *pcReadFrom;                /* Points to the last place that a queued 
                                                 item was read from. */

      xList xTasksWaitingToSend;              /* List of tasks that are blocked waiting 
                                                 to post onto this queue.  Stored in 
                                                 priority order. */

      xList xTasksWaitingToReceive;           /* List of tasks that are blocked waiting 
                                                 to read from this queue. Stored in 
                                                 priority order. */

      volatile unsigned portBASE_TYPE uxMessagesWaiting;/* The number of items currently
                                                           in the queue. */

      unsigned portBASE_TYPE uxLength;                  /* The length of the queue 
                                                           defined as the number of 
                                                           items it will hold, not the 
                                                           number of bytes. */

      unsigned portBASE_TYPE uxItemSize;                /* The size of each items that 
                                                           the queue will hold. */

    } xQUEUE;

```
由于一个 queue 可以被多个 task 写入（即 send data），所以有 xTasksWaitingToSend 这个 list 来追踪被 block 住的 task（等待写入资料到 queue 里的 task），每当有一个 item 从 queue 中被移除，系统就会检查 xTasksWaitingToSend，看看是否有等待中的 task 在 list 里，并在这些 task 中选出一个 priority 最高的，让它恢复执行来进行写入资料的动作，若这些 task 的 priority 都一样，那会挑等待最久的 task。

有许多 task 要从 queue 中读取资料时也是一样（即receive data），若 queue 中没有任何 item，而同时还有好几个 task 想要读取资料，则这些 task 会被加入 xTasksWaitingToReceive 里，每当有一个 item 被放入 queue 中，系统一样去检查 xTasksWaitingToReceive，看看是否有等待中的 task 在 list 里，并在这些 task 中选出一个 priority 最高的，让它恢复执行来进行读取资料的动作，若这些 task 的 priority 都一样，那会挑等待最久的 task。

* Queue 的用法

[/CORTEX_M4F_STM32_DISCOVERY/main.c](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/main.c#L213)

``` c

    /*file: ./CORTEX_M4F_STM32F407ZG-SK/main.c*/
    /*line:47*/
    xQueueHandle MsgQueue;
    /*line:214*/
    void QTask1( void* pvParameters )
    {
            uint32_t snd = 100;
    
            while( 1 ){
                    xQueueSend( MsgQueue, ( uint32_t* )&snd, 0 );  
                    vTaskDelay(1000);
            }
    }
    
    void QTask2( void* pvParameters )
    {
            uint32_t rcv = 0;
            while( 1 ){
                    if( xQueueReceive( MsgQueue, &rcv, 100/portTICK_RATE_MS ) == pdPASS  &&  rcv == 100)
                    {  
                            STM_EVAL_LEDToggle( LED3 );
                    }
            }
    }
```

关于 queue 的操作函式定义在 Source/queue.c


FreeRTOS 中也可使用 queue 来实作 semaphore 和 mutex：

    * Semaphores - 用来让一个 task 唤醒唤醒(wake)另一个 task，例如: producer 和 consumer
    * Mutexes - 用来对共享资源(critical section)做互斥存取

mutex 和 semaphore 的差异，请参见这篇短文: http://embeddedgurus.com/barr-code/2008/01/rtos-myth-1-mutexes-and-semaphores-are-interchangeable/

* 实作 semaphore

N-element semaphore，只需同步 uxMessagesWaiting，且只需关心有多少 queue entries 被占用，其中 uxItemSize 为 0，item 和 data copying 是不需要的。

需要用到 ARM Cortex-M4F 特有的机制，才能实做 semaphore，这个机制为『在存取 uxMessagesWaiting 时必须确保同一时间只能有一个 task 在做更改（进出入 critical section）』，要防止一次两个 task 进入修改的方法如下：

[portable/GCC/ARM_CM4F/port.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L399)

``` c

    /* In file: port.c */
    void vPortEnterCritical( void ) 
    { 
        portDISABLE_INTERRUPTS(); 
        uxCriticalNesting++; 
        __asm volatile( "dsb" ); 
        __asm volatile( "isb" ); 
    } 

    /*-----------------------------------------------------------*/ 
    
    void vPortExitCritical( void ) 
    { 
        configASSERT( uxCriticalNesting ); 
        uxCriticalNesting--; 
        if( uxCriticalNesting == 0 ) 
        { 
            portENABLE_INTERRUPTS(); 
        } 
    }
```

* 实作 mutex

因为 pcHead 和 pcTail 不需要，所以用 overloadind 来达到较好的使用率：

[queue.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L105)

``` c

        /* Effectively make a union out of the xQUEUE structure. */
        #define uxQueueType           pcHead
        #define pxMutexHolder         pcTail

    - uxQueueType 若为 0，表示这个 queue 已经被用来当作 mutex
    - pxMutexHolder 用来实作 priority inheritance
```

补充: http://embeddedgurus.com/barr-code/2008/03/rtos-myth-3-mutexes-are-needed-at-the-task-level/


* 生产者与消费者

使用 FreeRTOS 的 semaphore 和 mutex 来实作生产者与消费者问题：

``` c

    SemaphoreHandle_t xMutex = NULL;
    SemaphoreHandle_t empty = NULL;
    SemaphoreHandle_t full = NULL;
    xQueueHandle buffer = NULL;
    long sendItem = 1;
    long getItem = -1;
    
    void Producer1(void* pvParameters){
            while(1){
                    // initial is 10, so producer can push 10 item
                    if( xSemaphoreTake(empty, portMAX_DELAY) == pdTRUE ){
    
                            if( xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE ){
                            /******************** enter critical section ********************/
                                    xQueueSend( buffer, &sendItem, 0 );
                                    USART1_puts("add item, buffer = ");
                                    itoa( (long)uxQueueSpacesAvailable(buffer), 10);
                                    sendItem++;
                            /******************** exit critical section ********************/
                                    xSemaphoreGive(xMutex);
                            }
                            // give "full" semaphore
                            xSemaphoreGive(full);
                    }
                    vTaskDelay(90000);
            }
    }
    
    void Consumer1(void* pvParameters){
            while(1){
                    // initial is 0 so consumer can't get any item
                    if( xSemaphoreTake(full, portMAX_DELAY) == pdTRUE ){
    
                            if( xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE ){
                            /******************** enter critical section ********************/
                                    xQueueReceive( buffer, &getItem, 0 );
                                    USART1_puts("get: ");
                                    itoa(getItem, 10);
                            /******************** exit critical section ********************/
                                    xSemaphoreGive(xMutex);
                            }
                            // give "empty" semaphore
                            xSemaphoreGive(empty);
                    }
                    vTaskDelay(80000);
            }
    }
	```
[回目录](#目录)
    
排程
----------------

* 基本概念
![](https://wiki.csie.ncku.edu.tw/suspending.gif)
  

FreeRTOS 中除了由 kernel 要求 task 交出 CPU 控制权外，task 也能够可以自行交出 CPU 控制权

Delay(sleep): 暂停执行一段时间

[/CORTEX_M4F_STM32_DISCOVERY/main.c](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/main.c#L177)

``` c

    void Task2( void* pvParameters )
    {
    	while( 1 ){
    		vTaskDelay( 1000 );
    		itoa(iii, 10);
    		iii = 0;
    	}
    }
```

使用 vTaskDelay(ticks) 会将目前 task 的 ListItem 从 ReadyList 中移除并放入 DelayList 或是 OverflowDelayList 中(由现在的 systick 加上欲等待的 systick 有无 overflow 决定)，但 task 不是在呼叫了 vTaskDelay() 后马上交出 CPU 控制权，而是在下一次的 systick interrupt 才释出


wait(block): 等待取得资源或事件发生

``` c

    void QTask2( void* pvParameters )
    {
    	uint32_t rcv = 0;
    	while( 1 ){
    		if( xQueueReceive( MsgQueue, &rcv, 100/portTICK_RATE_MS ) == pdPASS  &&  rcv == 100)
    		{  
    			STM_EVAL_LEDToggle( LED3 );
    		}
    	}
    }
```


使用 xQueueReceive(xQueue, *pvBuffer, xTicksToWait)，等待时间还没到 portMAX_DELAY(FreeRTOS 最长的等待时间)时，task 会被放入 EventList 中等待取得资源或事件发生。若等待时间到了 portMAX_DELAY，则会被移到 SuspendList 中继续等待

* RTOS tick

  ![](https://wiki.csie.ncku.edu.tw/TickISR.gif)

 [portable/GCC/ARM_CM4F/port.c](https://github.com/TheKK/myFreeRTOS/blob/master/portable/GCC/ARM_CM4F/port.c#L506) 

实作细节


``` c

    void xPortSysTickHandler( void )                                                                                                                                                           
    {
        /* The SysTick runs at the lowest interrupt priority, so when this interrupt
        executes all interrupts must be unmasked.  There is therefore no need to
        save and then restore the interrupt mask value as its value is already
        known. */
        ( void ) portSET_INTERRUPT_MASK_FROM_ISR();
        {
            /* Increment the RTOS tick. */
            if( xTaskIncrementTick() != pdFALSE )
            {
                /* A context switch is required.  Context switching is performed in
                the PendSV interrupt.  Pend the PendSV interrupt. */
                portNVIC_INT_CTRL_REG = portNVIC_PENDSVSET_BIT;
            }
        }
        portCLEAR_INTERRUPT_MASK_FROM_ISR( 0 );
    }
```

``` c
    BaseType_t xTaskIncrementTick( void )                                                                                                                                                      
    {
        TCB_t * pxTCB;
        TickType_t xItemValue;
        BaseType_t xSwitchRequired = pdFALSE;

        traceTASK_INCREMENT_TICK( xTickCount );
        if( uxSchedulerSuspended == ( UBaseType_t ) pdFALSE )
        {
            ++xTickCount;

            {
                const TickType_t xConstTickCount = xTickCount;

                if( xConstTickCount == ( TickType_t ) 0U )
                {
                    taskSWITCH_DELAYED_LISTS();
                }
                else
                {
                    mtCOVERAGE_TEST_MARKER();
                }

                if( xConstTickCount >= xNextTaskUnblockTime )
                {
                    for( ;; )
                    {
                        if( listLIST_IS_EMPTY( pxDelayedTaskList ) != pdFALSE )
                        {
                            xNextTaskUnblockTime = portMAX_DELAY;
                            break;
                        }
                        else
                        {
                            pxTCB = ( TCB_t * ) listGET_OWNER_OF_HEAD_ENTRY( pxDelayedTaskList );
                            xItemValue = listGET_LIST_ITEM_VALUE( &( pxTCB->xGenericListItem ) );

                            if( xConstTickCount < xItemValue )
                            {
                                xNextTaskUnblockTime = xItemValue;
                                break;
                            }
                            else
                            {
                                mtCOVERAGE_TEST_MARKER();
                            }

                            ( void ) uxListRemove( &( pxTCB->xGenericListItem ) );

                            if( listLIST_ITEM_CONTAINER( &( pxTCB->xEventListItem ) ) != NULL )
                            {
                                ( void ) uxListRemove( &( pxTCB->xEventListItem ) );
                            }
                            else
                            {                                                                                                                                                                  
                                mtCOVERAGE_TEST_MARKER();
                            }

                            prvAddTaskToReadyList( pxTCB );

                            #if (  configUSE_PREEMPTION == 1 )
                            {
                                {
                                    xSwitchRequired = pdTRUE;
                                }
                                else
                                {
                                    mtCOVERAGE_TEST_MARKER();
                                }
                            }
                            #endif /* configUSE_PREEMPTION */
                        }
                    }
                }
            }

            #if ( ( configUSE_PREEMPTION == 1 ) && ( configUSE_TIME_SLICING == 1 ) )
            {
                if( listCURRENT_LIST_LENGTH( &( pxReadyTasksLists[ pxCurrentTCB->uxPriority ] ) ) > ( UBaseType_t ) 1 )
                {
                    xSwitchRequired = pdTRUE;
                }
                else
                {
                    mtCOVERAGE_TEST_MARKER();
                }
            }
            #endif /* ( ( configUSE_PREEMPTION == 1 ) && ( configUSE_TIME_SLICING == 1 ) ) */
        }
        else
        {
            ++uxPendedTicks;
        }

        #if ( configUSE_PREEMPTION == 1 )
        {
            if( xYieldPending != pdFALSE )
            {
                xSwitchRequired = pdTRUE;
            }
            else
            {
                mtCOVERAGE_TEST_MARKER();
            }
        }

        return xSwitchRequired;
    }
```


* Starvation
若 priority 高的 task 霸占 CPU，对于 priority 较低的 task 则无法执行，便会发生 starvation(低优先权很长一段时间都无法获得CPU执行)

(FreeRTOS 排程采用的是 multi-level queue, so?)

[回目录](#目录)

中断处理
---------------------------
 
这里主要讨论的是 ARM Cortext-M3 的中断(Exception)，有以下几种：

  * Reset：按下 reset 后会从向量表中指定的位址，用 privileged thread mode开始执行
  * NMI：简单说就是除了 reset 外最强的 exception
  * Hard Fault：做 exception handler 发生不可预期的悲剧时会触发这个例外
  * Memory management fault：memory protection 失败时，这个例外是 MPU 触发的，用来禁止装置进入绝对不可进入的记忆体区域
  * Bus Fault：执行指令或是 data transaction 时发生记忆体相关的错误，可能是 bus 的问题
  * Usage fault：执行未定义的指令、不合法的未对齐存取、指令执行时出现无效的状态、exception return 时出错、除以 0 (需要自行设定)
  * SVCall：SVC instruction 执行的 supervisor call（在OS的环境下）
  * PendSV：在 OS 的环境下，通常是用于 context switch
  * SysTick：当 timer 倒数到 0 时触发，也可以用软体中断，OS 会把这个 exception 当成 system tick。
  * Interrupt(IRQ)：周边装置触发的 exception，或是软体产生的 request

以下主要讨论 interrupt 要做到处理中断，一个作法是把 task 中用来等待 interrupt 发生的片段用 semaphore 框住，一个 ISR(interrupt service routine)被用来给(task) semaphore，以及释放一个用来处理 handler task 来处理 ISR，这使得 ISR 的使用上更为简化

在处理中断上软硬体的介接关系图如下：

![](https://wiki.csie.ncku.edu.tw/interupt.JPG)

* Nested Vectored Interrupt Controller(NVIC)

NVIC 是 Cortex-M3 的一部分，他是一组用来管理各种硬体周边发生中断讯号的暂存器，EXIT 则是 STM32 板子上管理各种硬体发生中断的控制器，EXIT 会通过 GPIO 把中断讯号送给 Cortext-M3 上的 NVIC 暂存器， FreeRTOS 在透过操作 NVIC 与呼叫 interrupt service routine 来处理硬体中断。

![](https://wiki.csie.ncku.edu.tw/NVIC_Register.png)

    * 能够定义 1~240 种 interrupt (FreeRTOS on ARM Cortex-M3 与 Cortex-M4 原始定义了 107 个 interrupt)
        * Cortex-M4 提供 240 个 Interrupt Priority Registers(IPR) 去记录
    * 可自定义的 interrput 优先权，从 0~255(0v为最大优先权，最小为 255)
        * PreemptionPriority: 4 bits
        * SubPriority: 4 bits
    * 处理器(硬体实作)在 interrupt 发生时会『自动』将当前状态 stack 起来，interrupt 结束后再 unstack 回来，借此减少 interrupt latency
    * 只需要将资料放入 Software Trigger Interrupt Register(STIR)，就能够触发 interrupt

在 [Lab40](http://wiki.csie.ncku.edu.tw/embedded/Lab40) 中，visualizer/main.c 中就有定义了 interrupt 的 priority 和取得 interrupt 的种类：

``` c

    #define NVIC_INTERRUPTx_PRIORITY ( ( volatile unsigned char *) 0xE000E400 )
        ...
    int get_interrupt_priority(int interrupt)
    {
        if (interrupt < 240)    // ARM 有 240 种 external interrupt(0~239)       
                /* 根据 interrupt 设定 priority，这个常数宣告为 char*，故等同 array */
                return NVIC_INTERRUPTx_PRIORITY[interrupt]; 
        return -1;
    }
```

* External Interrupt(EXTI)

各 interrupt handler 的排序和名称定义(并非实作内容)放置在 startup_stm32f429_439xx.s 中，实作则放在其他地方，FreeRTOS 使用者可以定义的外部中断通道为EXTI_Line0 到 EXTI_Line15，不过 EXTI_Line10~15 和 EXTI_Line5~9 被设定为同一外部中断通道，这表示 Line10 和 Line15 会呼叫同一个 handler，如果 Line10 和 Line15 需要有不同的任务，则要在 EXTI_Line10_15 的 handler 内做触发来源的判断

file:startup_stm32f429_439xx.s  line:158

 [CORTEX_M4F_STM32_DISCOVERY/startup/startup_stm32f4xx.s](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/startup/startup_stm32f4xx.s＃L82)

```  c

      .word     EXTI0_IRQHandler                  /* EXTI Line0                   */                        
      .word     EXTI1_IRQHandler                  /* EXTI Line1                   */                          
      .word     EXTI2_IRQHandler                  /* EXTI Line2                   */                          
      .word     EXTI3_IRQHandler                  /* EXTI Line3                   */                          
      .word     EXTI4_IRQHandler                  /* EXTI Line4                   */ 

      .word     EXTI9_5_IRQHandler                /* External Line[9:5]s          */     

      .word     EXTI15_10_IRQHandler              /* External Line[15:10]s        */    
```                       


EXTI 使用前必须：

    1. 和 GPIO 连接，作为触发来源 (有关 GPIO 的介绍请参照下一节)
    2. 设定 EXTI

        * 设定哪条 Line
        * 模式(Interrupt, Event)
        * 被触发的条件(Rising, Falling, Rising&falling)
        * LineCmd(ENABLE 表示设定该通道，DISABLE 表示关闭该通道)
    3. 设定 NVIC
        * IRQ_Channel
        * PreemptionPriority，SubPriority
        * ChannelCmd( 同 LineCmd 的用途 )

在 FreeRTOS 中操作 EXTI 的实作如下：

[CORTEX_M4F_STM32_DISCOVERY/main.c](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/main.c#L106)

``` c

        /* Configure PA0 pin as input floating */
        GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN;
        GPIO_InitStructure.GPIO_PuPd = GPIO_PuPd_NOPULL;
        GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
        GPIO_Init(GPIOA, &GPIO_InitStructure);

        /* Connect EXTI Line0 to PA0 pin */
        SYSCFG_EXTILineConfig(EXTI_PortSourceGPIOA, EXTI_PinSource0);

        /* Configure EXTI Line0 */
        EXTI_InitStructure.EXTI_Line = EXTI_Line0;
        EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;
        EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising;
        EXTI_InitStructure.EXTI_LineCmd = ENABLE;
        EXTI_Init(&EXTI_InitStructure);

        /* Enable and set EXTI Line0 Interrupt to the lowest priority */
        NVIC_InitStructure.NVIC_IRQChannel = EXTI0_IRQn;
        NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0x0F;
        NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0x0F;
        NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;
        NVIC_Init(&NVIC_InitStructure);
```

[回目录](#目录)

硬体驱动
------------------

这里是要透过 LED 的例子介绍用 GPIO 让硬体驱动的方法

* GPIO 简介
  
GPIO 是让开发者可借由改变暂存器特定位置的资料内容，来控制各种周边的硬体，或者借由外部的输入，来改变暂存器内容，让硬体得知其变化后做反应

在 STM32 的开发板上可以看到许多针脚，一般 STM32F429 的板子有 7 GPIO ports，分别是 Port A, B, C, D, E, F 和 G，每个 port 有自己的暂存器序列如下，各有 32 pins(对应 32 bits)：

    * GPIO port mode register (GPIOx_MODER)
    * GPIO port output type register (GPIOx_OTYPER)
    * GPIO port output speed register (GPIOx_OSPEEDR)
    * GPIO port pull-up/pull-down register (GPIOx_PUPDR)
    * GPIO port input data register (GPIOx _IDR)
    * GPIO port outp ut data register (GPIOx_ODR)
    * GPIO port bit set/reset register (GPIOx _BSRR)
    * GPIO port bit reset register (GPIOx_BRR)
    * GPIO port configuration lock register (GPIOx_LCKR)
    * GPIO alternate function low register (GPIOx_AFRL)
    * GPIO alternate function high register (GPIOx_AFRH)

例如当 GPIOx  的 `x` 是 A 时，表示我们现在存取的是 GPIO Port A 

使用 GPIO 前，必须预先设定行为和细节，以 stm32f429i_discovery.c 内的 LED 初始作业来看

[Utilities/STM32F429I-Discovery/stm32f429i_discovery.c](https://github.com/TheKK/myFreeRTOS/blob/exti/Utilities/STM32F429I-Discovery/stm32f429i_discovery.c#122)

``` c

    /* In file: stm32f429i_discovery.c */
    void STM_EVAL_LEDInit(Led_TypeDef Led)                                                                                                                          
    {
      GPIO_InitTypeDef  GPIO_InitStructure;
  
      /* Enable the GPIO_LED Clock */
      RCC_AHB1PeriphClockCmd(GPIO_CLK[Led], ENABLE);

      /* Configure the GPIO_LED pin */
      GPIO_InitStructure.GPIO_Pin = GPIO_PIN[Led];
      GPIO_InitStructure.GPIO_Mode = GPIO_Mode_OUT;
      GPIO_InitStructure.GPIO_OType = GPIO_OType_PP;
      GPIO_InitStructure.GPIO_PuPd = GPIO_PuPd_UP;
      GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
      GPIO_Init(GPIO_PORT[Led], &GPIO_InitStructure);
    }
```

使用者开启使用到的 GPIO 之 bus 的 clock，然后使用 GPIO_InitStructure(struct 资料型态)来储存相关设定，并交给 GPIO_Init() 去做记忆体的设定

* 底层实作

继续上面 LED 初始的过程为例，其中有涉及硬体设定的 function 为 RCC_AHB1PeriphClockCmd() 和 GPIO_Init()

先讨论 RCC_AHB1PeriphClockCmd()：

``` c

    /* In file: stm32f4xx.h */
    typedef struct
    {
    ...
    __IO uint32_t AHB1ENR;       /*!< RCC AHB1 peripheral clock register,                          Address offset: 0x30 */
    ...
    } RCC_TypeDef;

    #define RCC                 ((RCC_TypeDef *) RCC_BASE)
    #define RCC_BASE              (AHB1PERIPH_BASE + 0x3800)
    #define AHB1PERIPH_BASE       (PERIPH_BASE + 0x00020000)
    #define PERIPH_BASE           ((uint32_t)0x40000000) /*!< Peripheral base address in the alias region
    
    /* In file: stm32f4xx_rcc.h */
    #define RCC_AHB1Periph_GPIOA             ((uint32_t)0x00000001)
    
    /* In file: stm32f4xx_rcc.c */
    void RCC_AHB1PeriphClockCmd(uint32_t RCC_AHB1Periph, FunctionalState NewState)
    {
      /* Check the parameters */
      assert_param(IS_RCC_AHB1_CLOCK_PERIPH(RCC_AHB1Periph));

      assert_param(IS_FUNCTIONAL_STATE(NewState));
      if (NewState != DISABLE)
      {
        RCC->AHB1ENR |= RCC_AHB1Periph;
      }
      else
      {
        RCC->AHB1ENR &= ~RCC_AHB1Periph;
      }
    }   
```

不难发现，GPIO 周边的设定在实作上相当单纯，即在预先定义好的记忆体区段上，按照设计者定义之设定将参数写在该处

值得一提的是，GPIO 的初始化和设定皆是在执行时期进行，即使在程式运作中依然能够重新定义甚至关闭周边，这让 MCU 的使用更为弹性

GPIO_Init() 的执行也脱离不了写入资料至记忆体一事，但设定项目较多，设定过程也较为复杂

GPIO_Init()：

[CORTEX_M4F_STM32_DISCOVERY/Libraries/STM32F4xx_StdPeriph_Driver/src/stm32f4xx_gpio.c](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/Libraries/STM32F4xx_StdPeriph_Driver/src/stm32f4xx_gpio.c＃202)

``` c
    /* In file: stm32f4xx_gpio.c */
    void GPIO_Init(GPIO_TypeDef* GPIOx, GPIO_InitTypeDef* GPIO_InitStruct)
    {
      uint32_t pinpos = 0x00, pos = 0x00 , currentpin = 0x00;
  
      /* Check the parameters */
      assert_param(IS_GPIO_ALL_PERIPH(GPIOx));
      assert_param(IS_GPIO_PIN(GPIO_InitStruct->GPIO_Pin));
      assert_param(IS_GPIO_MODE(GPIO_InitStruct->GPIO_Mode));
      assert_param(IS_GPIO_PUPD(GPIO_InitStruct->GPIO_PuPd));
  
      /* ------------------------- Configure the port pins ---------------- */
      /*-- GPIO Mode Configuration --*/
      for (pinpos = 0x00; pinpos < 0x10; pinpos++)
      {
        pos = ((uint32_t)0x01) << pinpos;
        /* Get the port pins position */
        currentpin = (GPIO_InitStruct->GPIO_Pin) & pos;
    
        if (currentpin == pos)
        {
          GPIOx->MODER  &= ~(GPIO_MODER_MODER0 << (pinpos * 2));
          GPIOx->MODER |= (((uint32_t)GPIO_InitStruct->GPIO_Mode) << (pinpos * 2));
      
          if ((GPIO_InitStruct->GPIO_Mode == GPIO_Mode_OUT) || (GPIO_InitStruct->GPIO_Mode == GPIO_Mode_AF))
          {
            /* Check Speed mode parameters */
            assert_param(IS_GPIO_SPEED(GPIO_InitStruct->GPIO_Speed));
      
            /* Speed mode configuration */
            GPIOx->OSPEEDR &= ~(GPIO_OSPEEDER_OSPEEDR0 << (pinpos * 2));
            GPIOx->OSPEEDR |= ((uint32_t)(GPIO_InitStruct->GPIO_Speed) << (pinpos * 2));

            /* Check Output mode parameters */
            assert_param(IS_GPIO_OTYPE(GPIO_InitStruct->GPIO_OType));

            /* Output mode configuration*/
            GPIOx->OTYPER  &= ~((GPIO_OTYPER_OT_0) << ((uint16_t)pinpos)) ;
            GPIOx->OTYPER |= (uint16_t)(((uint16_t)GPIO_InitStruct->GPIO_OType) << ((uint16_t)pinpos));
          }

          /* Pull-up Pull down resistor configuration*/
          GPIOx->PUPDR &= ~(GPIO_PUPDR_PUPDR0 << ((uint16_t)pinpos * 2));
          GPIOx->PUPDR |= (((uint32_t)GPIO_InitStruct->GPIO_PuPd) << (pinpos * 2));
        }
      }
    }
```

- 参考 STM32Cube_FW_F4_V1.1.0/Projects/STM32F429I-Discovery/Examples/GPIO/GPIO_EXTI/readme.txt

[回目录](#目录)

效能评估
----------------
* Context switch

Context switch 是指 task A 要交出 CPU 使用权给 task B 时，OS 会将 task A 当前的状态和暂存器内的资料存放到记忆体，再将先前 task B 的状态从记忆体读取至暂存器的过程

想得知 FreeRTOS 中 context switch 时间，我们设计了一个测试方法：
[CORTEX_M4F_STM32_DISCOVERY/main.c](https://github.com/shin21/myFreeRTO-1/blob/ContextSwitchTest/CORTEX_M4F_STM32F407ZG-SK/main.c#L178)

``` c

    uint32_t iii = 0;

    void Task1( void* pvParameters )
    {
    	while( 1 ){
    		iii++;
    		while( STM_EVAL_PBGetState( BUTTON_USER ) ){
    			iii++;
    			STM_EVAL_LEDOn(LED4);
    		}
    	}
    }

    void Task2( void* pvParameters )
    {
    	while( 1 ){
    		vTaskDelay( 1000 );
    		itoa(iii, 10);
    		iii = 0;
    	}
    }

    void Task3( void* pvParameters )
    {
    	vTaskDelay( 300000 );
     	while(1){
     		itoa(iii, 10);
     		while(1){}
    	}
    }
    
    int main( void )
    {
        ...
    	xTaskCreate( Task1, (signed char*)"Task1", 128, NULL, tskIDLE_PRIORITY+1, NULL );
    	xTaskCreate( Task2, (signed char*)"Task2", 128, NULL, tskIDLE_PRIORITY+2, NULL );
    	xTaskCreate( Task3, (signed char*)"Task3", 128, NULL, tskIDLE_PRIORITY+3, NULL );
        ...
    }
```
![](https://wiki.csie.ncku.edu.tw/embedded/test1contextSwitch.jpg)
1. 首先建立 task1 和 task2，其中 task2 的优先权大于 task1 的优先权。task2 先执行，并且(task2)马上就呼叫 vTaskDelay 使 task2 移至 block 状态 1 秒，此时就会发生 context switch，切换成 task1 执行，这 1 秒的时间内，task1 不断的将全域变数 iii 做 ++，直到 1 秒结束后，回到 task2 执行，再由 task2 印出 iii 的值，并把 iii 重新设为 0，此为一个周期。此动作可得到 iii 在 1 秒内可跑到多少，设 1 秒可跑至 k 值。

2. 建立 task3 并设定其优先权高于 task2，task3 会执行 vTaskDelay 300 秒，当 300 秒结束后，会中断 task1 所执行的 iii++，再由 task3 印出 iii 值，设其为 final_i，k 值与 final_i 值的差额，即为 context switch 的总时间。

下图为随机挑出 45 个 iii 值做成图表，其中平均 iii 值为：4280015

![](https://wiki.csie.ncku.edu.tw/embedded/test2contextSwitch.jpg)
接著我们测出的 final_i 值，平均为：3913853，故可得到 (4280015 - 3913853)/ 4280015 = 0.0855 (秒)

0.0855 秒代表在 300 秒的测试内的所有 context switch 时间之总和

而因为一个周期（第一个步骤）会经过 2 个 context switch（上图），我们测 300 内共有 600 个 context switch，故我们测出每个 context switch 约为：0.0855 / 600 = 142.5（us）
　 
 
* interrupt latency

我们测量的架构为是手动设定一个 external interrupt，发生在 BUTTON_USER 按下时，下面程式是我们的实作：

[CORTEX_M4F_STM32_DISCOVERY/main.c](https://github.com/TheKK/myFreeRTOS/blob/exti/CORTEX_M4F_STM32_DISCOVERY/main.c#L106)

``` c
    i = 0;
    while( STM_EVAL_PBGetState( BUTTON_USER ) ){
        i++;
    }
```


当 BUTTON_USER 按下后，会先执行 i++ 直到 interruptHandler 处理 interrupt，读 i 值即可得知 interrupt latency，而实作结果发现 i 依旧为 0。
　

* IPC（Inter-Process Communication） throughput

[测试程式，在第 167 行可以改要执行的时间](https://github.com/TheKK/myFreeRTOS/blob/IPC-ThroughPut/CORTEX_M4F_STM32_DISCOVERY/main.c#L167)

SysTick 最小只能设到 1 / 100000 （十万分之一）秒

若设到 1 / 1000000 （百万分之一）秒，则会连将 data copy 至 queue 里都来不及执行

**环境设置：**

1. SysTick 为 1 / 100000 （十万分之一）秒

2. Queue的length为10000个

3. Queue的ItemSize为uint32_t

- 测试单向（send）

若使用一个task只执行send data的话，在100 SysTicks时间内可以丢入约740个，在1000 SysTicks时间内可以丢入约7500个，

则1 SysTick内平均send 7.5个，故throughput约为：7.5 * 100000 * 4 = 3 （Mbytes/s）

- 测试双向（send与receive）

若加入一个task来receive data，且priority和send data的priority相同

1000 SysTicks下可以接收到2962个，

则1 SysTick平均接收2.962个，故throughput约为：2.962 * 100000 * 4 = 1.185（Mbytes/s）

- 测试把每个ItemSize做变动

若每个ItemSize为uint16_t，则throughput约为：2.893 * 100000 * 2 = 0.579（Mbytes/s）

若每个ItemSize为uint64_t，则throughput约为：2.823 * 100000 * 8 = 2.258（Mbytes/s）

![](https://wiki.csie.ncku.edu.tw/embedded/IPC-test.png)

以上三者比较，在uint64_t时有最好的throughput，且snd和rcv相差最小。



* realtime capability

[回目录](#目录)

测试环境架设
----------------

![](https://wiki.csie.ncku.edu.tw/FreeRTOS_porting.jpg)

**安装**

    1. 请先安装 st-link 以及 openOCD，可参考[此页](https://stm32f429.hackpad.com/NOTE-WbiooOfkaoR) 

    2. git clone https://github.com/Justinsanity/freertos-basic.git

    3. cd freertos-basic & git checkout porting

    4. make

    5. 将 stm32 f4 - discovery 接上电脑

    6. make flash  # 烧进板子上并执行

    7. done

**Porting 解说**

工具：

  - stlink：用来烧录或 GDB server 的工具
  - openocd：用来执行 GDB server 与启用 semihosting 

OS X 上安装 gcc-arm-none-eabi、stlink、openocd

* stlink: `brew install stlink` (http://macappstore.org/stlink/)
* OpenOCD: `brew install open-ocd` (http://brewformulas.org/OpenOcd)
* gcc-arm-none-eabi:
    
* [方法一](https://gist.github.com/joegoggins/7763637)
    
``` sh

    1. brew tap PX4/homebrew-px4    
    2. brew update    
    3. sudo brew install gcc-arm-none-eabi	(might not the latest version)
```

* [方法二](https://launchpad.net/gcc-arm-embedded/+download)

``` sh

    1. Download "Mac installation tarball"
    2. Decompress tar
    3. set PATH
```

* FreeRTOS version: 8.2.1
* Board: STM32F429 Discovery

* Porting FreeRTOS 到 STM32F429-Discovery 主要是有几个重点
  1. Utility: 来自 STM32F429I-Discovery_FW_V1.0.1(官方 driver)，用途是提供一些操作硬体周边的函式库(API)，例如 LCD
  2. FreeRTOS：FreeRTOS 的 source code，在下载回来的包中 FreeRTOSV8.2.1/FreeRTOS/Source
  3. CORTEX_M4F_SK: 在下载回来的包中 FreeRTOSV8.2.1/FreeRTOS/Demo，用途是提供平台 CORTEX_M4F_SK 上的驱动函式库，是属于 FreeRTOS 软体方开发的接口

* 应用程式的开发

以 Lab39 的 freertos-basic 中 FreeRTOS 应用程式原始码 src/ 与 include/ 为例，我们整合成 app/，并把 src/ 中的 main.c 单独拉出来，延续 myFreeRTOS (branch: game) 的档案架构下，应用程式 game/ 和 main.c 是放在这里 CORTEX_M4F_SK 中，所以专案结构如下：

``` sh

    .
    |___CORTEX_M4F_SK
    |               |__ app/
    |               |__ main.c
    |               |__ others C files
    |___ FreeRTOS
    |___ Utility
```

Hint：main.c 有样板，在 STM32F429I-Discovery_FW_V1.0.1/Projects/Template


参考手册：http://www.st.com/web/en/resource/technical/document/reference_manual/DM00031020.pdf



API：Utilities/STM32F429I-Discovery 

[回目录](#目录)

问题讨论一
----------
**Q2:Suspend相关程式码**

FreeRTOS提供vTaskSuspend()和vTaskResume()这两个API来提供我们可以让task进入suspend状态。FreeRTOS还有另一个API为vTaskSuspendAll()而主要用途为当某一个task在执行时，某期间内可以让scheduler被suspend，防止context switch发生，实作方法为控制uxSchedulerSuspended的变数，vTaskSuspendAll()让uxSchedulerSuspended＋1 进入suspendall的状态 当程式码那段执行完时再用vTaskresumeall让uxSchedulerSuspended-1这用法再很多task里会用到

例如：vTaskDelay，vTaskDelayUntil为了让Tasks能顺利接上DelayedList而不被中断，当scheduler被suspend时，context switch会被pending，而在scheduler被suspend的情况下，interrupt不可更改TCB的xStateListItem。而PendingReadyList的用法也是当scheduler被suspend时若这种时候interrupt要解除一个task的block状态的话，则interrupt需将此task的event list  item放至xPendingReadyList中，好让scheduler解除suspend时，可将xPendingReadyList内的task 放入ready list里。   

**Q3:Priority范围且定义在哪里**

在./CORTEX_M4F_STM32F407ZG-SK/FreeRTOSconfig.h里

``` c
   #define configMAX_PRIORITIES            ( 5 )
```

**Q4:为什么要用doubly linked list**

因为doubly linked list在插入新ITEM时拥有常数的时间复杂度O(1)，而Singly linked list则是O(n)

**Q5：为什么FREERTOS在FORK之后是回传一个STRUCT 而不是PID**

追朔了xTaskCreate的程式码，发现他是执行 xTaskGenericCreate这个function，而xTaskGenericCreate是在function里malloc完成TCB之后，返回值有两个：

* pdPASS
* errCOULD_NOT_ALLOCATE_REQUIRED_MEMORY

资料型态为BaseType_t，宣告在portmacro.h里：

``` c
   typedef long BaseType_t;
```

所以他的回传值用途：回传告知在malloc memory时是否成功。

而linux使用回传PID的原因在于parent使用wait()来等待child，当child执行结束后会呼叫exit()，parent即可以clean up child process。若parent没有使用wait()的话，会造成parent可能已经先结束了，这样造成child变成zombie。

FreeRTOS的task create：

``` c

    xTaskCreate( vTaskCode, "NAME", STACK_SIZE, &ucParameterToPass, tskIDLE_PRIORITY, &xHandle );
```

其中Handle存的是新创的TCB这个structure的位址，将来要删除此task的话可以用如下方法：

```c
    /* Use the handle to delete the task. */
    if( xHandle != NULL 
    {
        vTaskDelete( xHandle );
    }
```


而Linux的parent和child为相同的位址空间，若回传为child的位址，将来parent要把child删除时，便也把自己给删除了...所以linux使用的是PID而不是structure的位址。

**Q6：STACK位置的排列，如何存放**

存放顺序：

xPSR

PC : Program counter 内容存放处理器要存取的下一道指令位址
LR : link rigisiter ：保存副程式的返回位址
R12 : Intra-Procedure-call scratch register
R3 : parameters
R2 : parameters
R1 : parameters
R0 : parameters

portINITIAL_EXEC_RETURN :  每个task要自己维护自己的返回值

* R11
* R10
* R9
* R8
* R7
* R6
* R5
* R4

注：xPSR：Composite of the 3 PSRs，

    APSR-Application Program Status Register–condition flags

    （存negative、zero、carry、overflow等）

    IPSR-Interrupt Program Status Register–Interrupt/Exception No.

    （存目前发生Exception的ISR Number ）

    EPSR-Execution Program Status Register

    （存Thumb state bit 和 execution state bits(If-Then (IT) instruction和Interruptible-Continuable Instruction (ICI) field)）

**Q7：LR(Link Rigisiter) 的用处**

当一个task A 执行被中断时（可能system tick 或是高优先权的Task出现）用来纪录Task A执行到哪里的位置，当其他程式执行完时，能返回继续成行Task A 

**Q8：为什么是R12 R3 R2 R1 要预留起来？**

R0~R3用来暂存Argument 的 scratch rigister （4个register的原因是为了handle values larger than 32 bits）

R0 R1 亦可暂存 subroutine 的result值

R12 : 作为The Intra-Procedure-call scratch register.

而为什么是这几个，因为叫方便使用

R12（IP）用法：

``` c

    mov     ip, lr
    bl      lowlevel_init
    mov     lr, ip

    先将lr暂存存入ip

    bl跳至其他branch的地方

    branch结束后使用lr跳回第三行，将ip存回lr
```

P.S. 关于veneer：
ARM 能支援 32-bit 和 16-bit 指令互相切换（THUMB 是 ARM 的 16-bit 指令集），其中切换的程式段叫 veneer 

[回目录](#目录)

**Q9：谁把New Task 接到 Ready List**

``` c
    GDB Trace result                                                                                                                                                                           
    
    Breakpoint 1, xTaskGenericCreate (pxTaskCode=0x80003b1 <GameTask>, pcName=0x800ea84 "GameTask", usStackDepth=128, pvParameters=0x0, uxPriority=1, pxCreatedTask=0x0, puxStackBuffer=0x0, 
    xRegions=0x0) at /home/kk/myPrograms/embedded/myFreeRTOS/tasks.c:516
    516        {
    (gdb) next
    520                configASSERT( pxTaskCode );
    (gdb) 
    516        {
    (gdb) 
    520                configASSERT( pxTaskCode );
    (gdb) 
    521                configASSERT( ( ( uxPriority & ( ~portPRIVILEGE_BIT ) ) < configMAX_PRIORITIES ) );
    (gdb) 
    525                pxNewTCB = prvAllocateTCBAndStack( usStackDepth, puxStackBuffer );
    (gdb) 
    572                        prvInitialiseTCBVariables( pxNewTCB, pcName, uxPriority, xRegions, usStackDepth );
    (gdb) 
    551                                pxTopOfStack = pxNewTCB->pxStack + ( usStackDepth - ( uint16_t ) 1 );
    (gdb) 
    572                        prvInitialiseTCBVariables( pxNewTCB, pcName, uxPriority, xRegions, usStackDepth );
    (gdb) 
    551                                pxTopOfStack = pxNewTCB->pxStack + ( usStackDepth - ( uint16_t ) 1 );
    (gdb) 
    572                        prvInitialiseTCBVariables( pxNewTCB, pcName, uxPriority, xRegions, usStackDepth );
    (gdb) 
    551                                pxTopOfStack = pxNewTCB->pxStack + ( usStackDepth - ( uint16_t ) 1 );
    (gdb) 
    552                                pxTopOfStack = ( StackType_t * ) ( ( ( portPOINTER_SIZE_TYPE ) pxTopOfStack ) & ( ( portPOINTER_SIZE_TYPE ) ~portBYTE_ALIGNMENT_MASK  ) ); /*lint !e923 MISRA exception.  Avoiding casts between pointers and integers is not practical.  Size differences accounted for using portPOINTER_SIZE_TYPE type. */
    (gdb) 
    572                        prvInitialiseTCBVariables( pxNewTCB, pcName, uxPriority, xRegions, usStackDepth );
    (gdb) 
    584                                pxNewTCB->pxTopOfStack = pxPortInitialiseStack( pxTopOfStack, pxTaskCode, pvParameters );
    (gdb) 
    588                        if( ( void * ) pxCreatedTask != NULL )
    (gdb) 
    602                        taskENTER_CRITICAL();
    (gdb) 
    604                                uxCurrentNumberOfTasks++;
    (gdb) 
    605                                if( pxCurrentTCB == NULL )
    (gdb) 
    604                                uxCurrentNumberOfTasks++;
    (gdb) 
    605                                if( pxCurrentTCB == NULL )
    (gdb) 
    604                                uxCurrentNumberOfTasks++;
    (gdb) 
    605                                if( pxCurrentTCB == NULL )
    (gdb) 
    609                                        pxCurrentTCB =  pxNewTCB;
    (gdb) 
    611                                        if( uxCurrentNumberOfTasks == ( UBaseType_t ) 1 )
    (gdb) 
    (gdb) 
    616                                                prvInitialiseTaskLists();
    (gdb) 
    645                                uxTaskNumber++;
    (gdb) 
    655                                prvAddTaskToReadyList( pxNewTCB );
    (gdb) 
    645                                uxTaskNumber++;
    (gdb) 
    655                                prvAddTaskToReadyList( pxNewTCB );
    (gdb) 
    645                                uxTaskNumber++;
    (gdb) 
    655                                prvAddTaskToReadyList( pxNewTCB );
    (gdb) 
    645                                uxTaskNumber++;
    (gdb) 
    655                                prvAddTaskToReadyList( pxNewTCB );
    (gdb) 
    645                                uxTaskNumber++;
    (gdb) 
    650                                        pxNewTCB->uxTCBNumber = uxTaskNumber;
    (gdb) 
    655                                prvAddTaskToReadyList( pxNewTCB );
    (gdb)                                                                                                                                                                                      
    660                        taskEXIT_CRITICAL();
    (gdb) 
    670                        if( xSchedulerRunning != pdFALSE )
    (gdb) 
    657                                xReturn = pdPASS;
    (gdb) 
    690        
```
* prvInitialiseTaskLists(void)

只有在list未被初始化时，才会被执行。预设会建立pxReadyTasksLists，xDelayedTaskList1，xDelaye    traceMOVED_TASK_TO_READY_STATEdTaskList2，xPendingReadyList，依照使用者设定可以选择是否建立xTasksWaitingTermination和xSuspendedTaskList

* prvAddTaskToReadyList( pxNewTCB )

将pxNewTCB接上pxReadyTasksLists，prvAddTaskToReadyList()程式码如下

``` c

    #define prvAddTaskToReadyList( pxTCB ) \
            traceMOVED_TASK_TO_READY_STATE( pxTCB ) \
            taskRECORD_READY_PRIORITY( ( pxTCB )->uxPriority ); \
            vListInsertEnd( &( pxReadyTasksLists[ ( pxTCB )->uxPriority ] ), &( ( pxTCB )->xGenericListItem ) )

```

* traceMOVED_TASK_TO_READY_STATE

``` c
    #ifndef traceMOVED_TASK_TO_READY_STATE
            #define traceMOVED_TASK_TO_READY_STATE( pxTCB )   
    #endif
```

自定义函式，无预设定义。Debug用

* taskRECORD_READY_PRIORITY

``` c
    #define taskRECORD_READY_PRIORITY( uxPriority  ) \
    { \
        if( ( uxPriority ) > uxTopReadyPriority ) \
        { \
            uxTopReadyPriority = ( uxPriority ); \
        } \
    } /* taskRECORD_READY_PRIORITY */
```


检查目前task的priority是否高于“当前最高优先权”。如果是，将更新当前最高优先权。

* vListInsertEnd

``` c

    void vListInsertEnd( List_t * const pxList, ListItem_t * const pxNewListItem )
    {
    ListItem_t * const pxIndex = pxList->pxIndex;
                                                                                                                   
            /* Insert a new list item into pxList, but rather than sort the list,
            makes the new list item the last item to be removed by a call to
            listGET_OWNER_OF_NEXT_ENTRY(). */
            pxNewListItem->pxNext = pxIndex;
            pxNewListItem->pxPrevious = pxIndex->pxPrevious;
            pxIndex->pxPrevious->pxNext = pxNewListItem;
            pxIndex->pxPrevious = pxNewListItem;

            /* Remember which list the item is in. */
            pxNewListItem->pvContainer = ( void * ) pxList;
            ( pxList->uxNumberOfItems )++;
    }
```
将pxNewListItem插入至pxList的最后面

[回目录](#目录)

**Q10:arm conditional code?**

conditional code用法为附加在某些条件指令之后，用来定义指令执行的代码

![](https://wiki.csie.ncku.edu.tw/embedded/condition.png)

**Q11:Thumb state bit? execution state bit?**

EPSR-Execution Program Status Register内有存Thumb state bit 和 execution state bits，
其中execution state bits包含两个重叠的区域：**

1. If-Then (IT) instruction

2. Interruptible-Continuable Instruction (ICI) field)

* about IT

IT（If - Then）指令由紧连IT的1～4条后续指令所组成（IT block）。
http://web.eecs.umich.edu/~prabal/teaching/eecs373-f10/readings/ARMv7-M_ARM.pdf
p.148~p.149
IT instruction example：

``` c

    if (R4 == R5)
    {
      R7 = R8 + R9;
      R7 /= 2;
    }
    else
    {
      R7 = R10 + R11;
      R7 *= 2;
    }
```

converts to
http://wiki.csie.ncku.edu.tw/embedded/freertos

``` c

    CMP R4, R5
    ITTEE EQ
    ADDEQ R7, R8, R9    ; if R4 = R5, R7 = R8 + R9
    ASREQ R7, R7, #1    ; if R4 = R5, R7 /= 2
    ADDNE R7, R10, R11  ; if R4 != R5, R7 = R10 + R11
    LSLNE R7, R7, #1    ; if R4 != R5, R7 *=2
```

* about ICI

多暂存器(multy register)读取（LDM）和写入（STM）是可以中断的，ICI用来保存该执行过程中，下一个暂存器的编号。

**Q12:R0~R3 , R12 , LR 这些对应到function call是哪里?**

**Q13:R4~R11用在甚么时候?**

![](https://wiki.csie.ncku.edu.tw/embedded/coreReg.png)

**Q14:接续Q5,问FreeRTOS设计概念,回去看OS的fork部分**

摘自且翻译恐龙书八版P110～112：
* 父程序（parent process）产生子程序（child process），这些新的程序被产生（fork()）后，会形成程序树（tree of processes）。

![](https://wiki.csie.ncku.edu.tw/embedded/ProcessTree.jpg)

* 一般而言，一个程序会需要一些资源（resource），子程序可以直接获得资源或是子程序被限制在父程序的资源里。「限制子程序在父程序资源里」可以防止因为产生太多子程序而发生超载（overloading）。

* 典型的方法是，在呼叫fork()之后，父程序和子程序其中一个可以使用exec()来呼叫一个新的程式，取代自己的记忆体空间，这个方法的好处是，父、子程序可以跑不同的程式并且还可以做沟通（communicate）。

**Q15:VFP有几个暂存器**

ARM 浮点数架构 （VFP，全名Vector Floating-Point）为对浮点运算的操作提供的硬体支援。

![](https://wiki.csie.ncku.edu.tw/embedded/VFP.png)

http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.ddi0439b/Chdhfiah.html

上面表格式VFP会用到的REG

另外FPU拥有独立的暂存器有32个（32bit)（S0~S31)

所以在PORT.C void xPortPendSVHandler( void ) 

``` c

    "    tst r14, #0x10                        \n" /* Is the task using the FPU context?  If so, push high vfp registers. */ 
    "    it eq                                \n" 
    "    vstmdbeq r0!, {s16-s31}                \n" 
```
    
 就会把HIGH的部份堆起来（借由STMDB达成）

**Q16:!是什么(组语)**

Note that the exclamation mark in ARM assembly
code means that the index operation is performed before applying the
real instruction.

For example, str r2, [r3, #-4]!  means: store r2
value to the ptr {r3-4} and r3 = r3 -4.

指令集架构：

``` c

    ADD R0, R0, #1                     ; R0←R0＋1
    STR  R0, [R1]                      ; R0→[R1]  //将R0的值传送到以R1的值为位址的记忆体中
    ADD R0, R1, R2 LSL #3              ; R0←R1 + R2*8  //R2中的运算元左移3位元
    LDMIA  R0, {R1, R2, R3}            ; [R0]→R1
                                       ; [R0+4]→R2
                                       ; [R0+8]→R3
    比较三种：
    LDR R0, [R1, #8]                   ; R0←[R1+8]
    LDR R0, [R1], #8                   ; R0←[R1]
                                       ; R1←R1+8
    LDR R0, [R1, #8]!                  ; R0←[R1+8]
                                       ; R1←R1+8
```

* 关于STMxx和LDMxx指令

![](https://wiki.csie.ncku.edu.tw/embedded/stm.png)


**Q17:**attribute**(( naked ))  naked是干嘛?**

 function经过compiler compile后都会在function entry和exit加入一些code，如save used registers，add return code.

但是如果不想要compiler加上这些code，就可以在function宣告时加上attribut : naked

``` c

    void funA(void) __attribute__ ( (naked))
    {
    ...
     asm("ret");
    }
```

**Q18: vPortEnterCritical 程式码为何能确保一次只有一个task进入critical section uxCriticalNesting++  ?**

``` c

    funcA(){
        vPortEnterCritical();
        ...
        funcB();
        ...
        vPortExitCritical();
    }
    funcB(){
        vPortEnterCritical();
        ...
        vPortExitCritical();
    }
```

**Q19 :schedule 那边[ 在一般非即时作业系统上，通常每个task都会分到相同的CPU使用时间，RTOS则不尽然，后续将提到相关资讯 除了由kernel要求task交出CPU控制权外，各task也能够选择自行交出CPU控制权，举凡]作更正**

更新在上面内容

**Q20:关于  xTaskIncrementTick() 程式码**

更新在上面内容

**Q21: queue实作是不是cycle？**

是，参考

``` c

    pxQueue->pcWriteTo += pxQueue->uxItemSize;                                                                                                                                     
                    if( pxQueue->pcWriteTo >= pxQueue->pcTail ) /*lint !e946 MISRA exception justified as comparison of pointers is the cleanest solution. */
                    {
                            pxQueue->pcWriteTo = pxQueue->pcHead;
                    }
                    else
                    {
                            mtCOVERAGE_TEST_MARKER();
                    }
```
[回目录](#目录)

问题讨论二
----------
(分两部分纯粹是为了目录连结方便)

**Q22: [Lab40 ](http://wiki.csie.ncku.edu.tw/embedded/Lab40) 的 visualizer/main.c 的 get_time() 里 scale 为什么是 microsecond ？**

问题是这样的，为了计算 context switch 的时间，我们需要先取的系统的时间(系统启动至今历经的时间)，之前在 Lab40 有使用过 tick count 来取得系统时间，在 visualizer/main.c 中的 get_time() 最后 return 的 `xTaskGetTick() + ( reload - current / reload)` 是目前系统已经执行的 ticks 加上目前系统历经的 count downs 数 ( 1 / x tick，读作『x 分之一 tick』)，这段就是用 tick 来表示目前经历的时间，要把这个 ticks 转成 human readable time，也就是要让 ticks 转换成 second，一个作法就是乘上『单位量级(scale)』，这个 scale 定义在 return 之前，请参考以下片段：

*visualizer/main.c*

![](https://wiki.csie.ncku.edu.tw/main.png)

我们在意的是为什么 scale 单位是 microsecond 呢?

先往上追 configTICK_RATE_HZ 的定义：

*visualizer/FreeRTOSConfig.h*

![](https://wiki.csie.ncku.edu.tw/FreeRTOSConfig.png)

所以 scale = 1000000/100 (tick/sec) = 10000
但是这样我们还是不知道该给 scale 下什么单位，因为 configTICK_RATE_HZ 只是频率，也就是『每单位时间内有几次tick』，官方并没有定义这个单位时间是什么。

但是我们注意到使用手册中提到，FreeRTOS 在管理 task 的时候，有一个 API – vTaskDelay() 可以用来让 Task 暂停一段时间，使用方法如下：
*FreeRTOS 官网*

![](https://wiki.csie.ncku.edu.tw/vTaskFunction.png)

这段程式码中使用了 vTaskDelay() 来暂停 task，文件说明这个函数的参数如果是整数常数，单位是 ticks，也就是说传入整数如：vTaskDelay(500)，会暂停 500 ticks，而上述程式码我们传入的参数是 500/portTICK_RATE_MS，注解说这样就可以让 task 暂停 500 ms(10^-3 second)，所以 n / portTICK_RATE_MS 是 ms，然而此时的 n 应该不是 ticks 了(the result of our discussion)
 
接著我们去追portTICK_RATE_MS 的定义：
*freertos-basic/freertos/libraries/FreeRTOS/portable/GCC/ARM_CM3/portmacro.h*

![](https://wiki.csie.ncku.edu.tw/portmacro.png)

(in v8.2.1, portTICK_RATE_MS was renamed to portTICK_PERIOD_MS)

至此，我们推倒如下：

``` text

    vTaskDelay() 的 parameter 是以 tick 为单位 
    vTaskDelay ( 500 / portTICK_RATE_MS ) 
    = vTaskDelay ( 500 / 1000 / configTICK_RATE_HZ ) 
    = vTaskDelay (50) 
    即 delay 50 ticks 

    因 500 / portTICK_RATE_MS = 500 ms =  50 ticks
    另 500 ms = 500 / portTICK_RATE_MS 意思是 500/portTICK_RATE_MS 可以视为 500 ms
    又 500 / portTICK_RATE_MS = 50 ticks => 500 (ms) = 50(tick) * portTICK_RATE_MS
    得 x ticks * portTICK_RATE = 10 * x ms

    又 scale  = 1000000 / configTICK_RATE_MS
    = 1000 * (1000 / configTICK_RATE_MS)
    = 1000 * portTICK_RATE_MS

    所以 ticks * scale = 1000 * ticks * portTICK_RATE 可以得到 us 的值  #

    其实就是说，ticks 是电脑历经的时间，我们说 『x ticks 等于 y ms』
    所以 get_time 就是要把 x tick 转成 y ms，做法是把 x  ticks 乘上 1000/config 
    现在已经得到  y ms
    进一步要把 x tick 的转成 us
    因 1 ms = 1000 us
    => x ticks = y ms = 1000*y*(1/1000) ms
    所才要再乘上 1000
```

原来的盲点是，以为把『量级』乘 1000，这样会使 1ms 变成 1000ms，实际上是把『数值』乘 1000，当 1 时是对应 ms 的值，1000 则是对应 us 的值

* subproblem: return 的 式子 不精准，因为 ( reload - current ) / reload  always 0 ，( 因为 int / int )，而这部分有试著去改善，但是不能 return float/double (WHY ?)

    jserv：进行除法运算，FPU 可能还没启用

[回目录](#目录)

**Q23. FreeRTOS 如何追到自己?**

* 为何知道 vTaskDelete(NULL) 的 NULL 是表示 task 本身?**

在 task.c (line 400) 之中，我们找出了 vTaskDelete(NULL) 的实作是 macro:

``` c

    void vTaskDelete( TaskHandle_t xTaskToDelete )
    {
        TCB_t *pxTCB;
    
        taskENTER_CRITICAL();
        {
            /* If null is passed in here then it is the calling task that is being deleted. */
            pxTCB = prvGetTCBFromHandle( xTaskToDelete );
```

                    
* 在什么情况下，会执行到 vTaskDelete(NULL) 呢? 遇无穷回圈时会执行此code吗?

因为 FreeRTOS 不准 task function 有 return，也不准执行到最后一行，因此如果不需要此 task，则应该删除此task 
(参考 : [http://redmilk525study.blogspot.tw/2014/09/freertos-task-management.html](http://redmilk525study.blogspot.tw/2014/09/freertos-task-management.html))

有一个可能性是，如果在 loop 中发生执行错误 (fail)，则需要跳出回圈并终止(自己)执行，此时就需要使用 vTaskDelete 来删除自己，发生错误的例子：

    1. 假如今天一个 task 是要存取资料库，但是资料库或资料表不存在，则应该结束 task
    2. 假如今天一个 client task 是要跟 server 做连线( listening 就是 loop)，却发现 client 端没有网路连线，则应结束 task

**Q24. 这个 usStackDepth 如何去计算他占用空间?**

在 FreeRTOS 里面，usStackDepth 设定 100，假设每个 stack 为 16 bits 宽，则他所占用的记忆体空间为 200 bytes，这个值指定的是 stack 的堆叠空间 (stack size)可以保留多少 word(4 bytes)，如果设定为 100，则系统将会分配 400 bytes 给 task，没有简单的方法可以计算一个任务到底需要多少空间，大多数做法都是先简单地给予一个初估的值，然后再随著任务运作的讯息来调整。

**Q25. 为何 configMAX_PRIORITIES 要 -1 ?**

这个问题是在想：如果 configMAX_PRIORITIES 设定为 10，为什么不可以分配 10 给一个 task?

从 pxReadyTasksLists[ uxTopReadyPriority ] 看起来

![](https://wiki.csie.ncku.edu.tw/readytasklist.png)

ready list 应该是每个 index 表示不同的 priority
(换句话说，同一个 index 的 ready list 中的 tasks 应该是具有相同 priority 的)

所以，为了配置 ready list 的长度，只能从 0 ~ priority - 1，也就是说，你若要让 ready list 长度是 10 (分别代表著 priority 0 - 9)，则你虽然要把 configMAX_PRIORITY 设定为  10，分配权限时最高却只能到  configMAX_PRIORITY，其实我只是简单的理解上是array 如果要有1~10个优先权定义，事实上写程式时是定义0~9 而已，的确是由0开始数没错。

[回目录](#目录)

**Q26.真正放至 ready list 的是什么? 是放入 handle?**

<freertos/libraries/FreeRTOS/include/task.h#L345>

``` c

    #define xTaskCreate( pvTaskCode, pcName, usStackDepth, pvParameters, uxPriority, pxCreatedTask ) 
            xTaskGenericCreate( ( pvTaskCode ), ( pcName ), ( usStackDepth ), ( pvParameters ), ( uxPriority ), 
            ( pxCreatedTask ), ( NULL ), ( NULL ) )
```
(这三行是同一行，未方便阅读而断行)

在这里把 xTaskGenericCreate() 包装成 xTaskCreate()，所以 main 中呼叫 vTaskCrate() 实际上是呼叫 xTaskGenericCreate()

然后是呼叫 <freertos/libraries/FreeRTOS/tasks.c#L551> 的 xTaskGenericCreate，在 xTaskGenericCreate 中我们找到把 task 加入 readyList 的地方(#704)：


``` c
    prvAddTaskToReadyList( pxNewTCB );
```

所以实际上是把该 task 的 TCB 加入 readyList

那要怎么辨识 task 呢？
((`configASSERT( pxTaskCode );` 并不是注册 taskCode，`configASSERT()` 只是用来测试的))
在 line 621 (xTaskGenericCreate)：

``` c
 
    /* Setup the newly allocated TCB with the initial state of the task. */
    prvInitialiseTCBVariables( pxNewTCB, pcName, uxPriority, xRegions, usStackDepth );
```

这里看到带有 pcName 却没有 taskCode，我们已知 pcName 只用做开发识别，不用做系统管理，所以追到下面

``` c

    #if( portUSING_MPU_WRAPPERS == 1 )
    {
        pxNewTCB->pxTopOfStack = pxPortInitialiseStack( pxTopOfStack, pxTaskCode, pvParameters, xRunPrivileged );
    }
    #else /* portUSING_MPU_WRAPPERS */
    {
        pxNewTCB->pxTopOfStack = pxPortInitialiseStack( pxTopOfStack, pxTaskCode, pvParameters );
    }
```

应该是因为在 TCB 中记录了 stack 的起始位址，这里有 pxTaskCode，不是用 handle！(不过 handle 是否也是指向 pxTopOfStack???)

* handle: (台：控制代码、中：句柄)实际的意义是一个用来存取该 task 的『指标』，他是提供外部系统或程式来参照目前 task 用的

举个例子：删除 task

``` c

    vTaskCreate(..., taskA, ...)
```

当我们要呼叫 vTaskDelete 来删除 taskA 时，为了让 vTaskDelete 存取到 taskA 的记忆体位址，我们要传入一个指向 taskA 的指标到 vTaskDelete 中，这个指标就是 handle

建立 handle 的方法如下：

``` c

    xTaskHandle handleTaskA;    // 建立一个用来指向 taskA 的 handle 指标变数
    vTaskCreate(.., taskA, ..., handleTaskA);   // 传入这个指标变数，让 vTaskCreate 可以记录他

    /* 因为是 pass by address，handleTaskA 大概在 vTaskCreate() 中只是被修改值，所以离开 vTaskCreate 后就可以直接存取到 handleTaskA 的内容 */
    vTaskDelete(handleTaskA);   // 传入 handle 以供 vTaskDelete 参考
```


**Q27. FreeRTOS 在哪里去更新 pcCurrentTCB 这个 pointer ? 指向最新正在运行的 task?**

这个问题是要探讨如何用 scheduler，still working...to be continue.

**Q28. 为何不使用 linked-list 去纪录 priority value?**

因为 linked-list 要去排序的话，有 N 个，有可能会有 n^2 或者是 nlogn 的时间复杂度，且 array 可以做 random access，这对以 priority 作为 index 的 ready list 来说，会比 linked-list 更直接的存取到指定的 priority

使用 uxTopReadyPrioirty 是因为用空间换时间，搜寻会只有常数时间复杂度

**Q29. xListEnd在哪? **

xLIST 中的 xListEnd 是 xLIST（linked-list？）的尾巴

**Q30. FreeRTOS 的event 定义是什么? 是同步机制还是非同步?**

    -Event bits are used to indicate if an event has occurred or not. Event bits are often referred to as event flags.
    -来源：[http://www.freertos.org/FreeRTOS-Event-Groups.html](http://www.freertos.org/FreeRTOS-Event-Groups.html)

![](https://wiki.csie.ncku.edu.tw/eventbit.png)

group 中有很多 bit，分别代表 task 正在等待的一个 event，并不一定所有的 bit 都会用到，看 task 需要等待多少 task
event 例如：

``` text

    A message has been received and is ready for processing
    The application has queued a message that is ready to be sent to a network
    It is time to send a heartbeat message onto a network
```

TCB 结构中还有两个 xListItem：xGenericListItem 和 xEventListItem

``` c

    xListItem    xGenericListItem;               /* 用来记录 task 的 TCB 在 FreeRTOS ready 和 blocked queue 的位置 */
    xListItem    xEventListItem;                 /* 用来记录 task 的 TCB 在 FreeRTOS event queue 的位置 */
```

不论 xGenericListItem 或 xEventListItem，都是 xListItem_t 型态，这个结构定义在 list.h：

``` c
    
    struct xLIST_ITEM
    {
        listFIRST_LIST_ITEM_INTEGRITY_CHECK_VALUE                              
        configLIST_VOLATILE TickType_t xItemValue;                        
        struct xLIST_ITEM * configLIST_VOLATILE pxNext;              
        struct xLIST_ITEM * configLIST_VOLATILE pxPrevious;       
        void * pvOwner;                                                                             
        void * configLIST_VOLATILE pvContainer;                              
        listSECOND_LIST_ITEM_INTEGRITY_CHECK_VALUE                               
    };
    typedef struct xLIST_ITEM ListItem_t;        
```                               

[回目录](#目录)

**Q31. 如何知道 task现在处于哪个状态? 对应状态图的程式码在哪里?**

Task 有四种状态  blocked ('B'), ready ('R'), deleted ('D') or suspended ('S')

vTaskList(buf)  将task的所有资讯写进buf内，之后再把buf的内容print出来

``` c
 
    fio_printf(1, "\n\rName          State   Priority  Stack  Num\n\r");
    fio_printf(1, "*******************************************\n\r");
    fio_printf(1, "%s\r\n", buf + 2);
```

就可以知道task处于哪个状态

``` text

    vTaskList() calls uxTaskGetSystemState(), then formats the raw data generated by uxTaskGetSystemState() into a human readable       
    (ASCII) table that shows the state of each task, including the task's stack high water mark (the smaller the high water mark 
    number the closer the task has come to overflowing its stack). Click here to see an example of the output generated.
    In the ASCII table the following letters are used to denote the state of a task：
        'B' - Blocked
        'R' - Ready
        'D' - Deleted (waiting clean up)
        'S' - Suspended, or Blocked without a timeout
    vTaskList() is a utility function provided for convenience only. It is not considered part of the kernel. 
    SeevTaskGetRunTimeStats() for a utility function that generates a similar table of run time task utilisation information.

    Parameters:

    pcWriteBuffer  A buffer into which the above mentioned details will be written, in ASCII form. This buffer is assumed to be 
                   large enough to contain the generated report. Approximately 40 bytes per task should be sufficient.	
```

**Q32. 画一下 pxStack 以及 pxTopOfStack 的记忆体位置图(用gdb去trace)**

2015 春季班 v8.2.1 版本

<freertos/libraries/FreeRTOS/portable/GCC/ARM_CM3/port.c>

``` c

    /*
     * See header file for description.
     */
    StackType_t *pxPortInitialiseStack( StackType_t *pxTopOfStack, TaskFunction_t pxCode, void *pvParameters )
    {
        /* Simulate the stack frame as it would be created by a context switch interrupt. */
        pxTopOfStack--; /* Offset added to account for the way the MCU uses the stack on entry/exit of interrupts. */
        *pxTopOfStack = portINITIAL_XPSR;        /* xPSR */
        pxTopOfStack--;
        *pxTopOfStack = ( StackType_t ) pxCode;        /* PC */
        pxTopOfStack--;
        *pxTopOfStack = ( StackType_t ) portTASK_RETURN_ADDRESS;        /* LR */
        pxTopOfStack -= 5;        /* R12, R3, R2 and R1. */
        *pxTopOfStack = ( StackType_t ) pvParameters;        /* R0 */
        pxTopOfStack -= 8;        /* R11, R10, R9, R8, R7, R6, R5 and R4. */

        return pxTopOfStack;
    }
```

参考了 [Lab33](http://wiki.csie.ncku.edu.tw/embedded/Lab33)使用 "(gdb) target: remote" + "info registers" 来观察暂存器内容，而在 freertos-basic/tool/gdbscript 中就已经有 target: remote 3333 了，freertos/mk/qemu.mk 呼叫 qemu 并且直接进入 gdb，因此可以使用 info registers 来观察，下图是 pxPortStackInitialise() 执行完毕以后的暂存器状态图

![](https://wiki.csie.ncku.edu.tw/end_pxPortStackInitialise.png)

**Q33. 在 FreeRTOS 里面，其 pid 在哪里? 如何知道 task 的 id 资讯?**

FreeRTOS 建立新 task 的方式与 Linux 不同，前者是用 vTaskCreate()，如果有回传，只会回传 pdPass 或 error 来表示 task 建立成功与否，如果要让程式辨识这个 task，在 create 时就要给予 vTaskCreate 一个用来记录该 task TCB 起始位址的 handle 指标，因此 FreeRTOS 没有 PID

FreeRTOS 透过一个 pxCurrentTCB 的指标来存取目前指向的 task 基本资讯，也就是说如果要知道 task 的资讯，都是去存取 TCB，2007 年的资料显示，好像可以透过存取 pxCurrentTCB->uxTCBNumber 来取得 task 的编号，但是目前的 TCB 已经没有这个项目了

至于考虑使用 handle 来取得 task id 也是不对的，因为 handle 指向的是 TCB 的位址，因此他也是存取 TCB


[回目录](#目录)

参考资料
--------
* [The Architecture of Open Source Applications: FreeRTOS](http://www.aosabook.org/en/freertos.html)
  - [简体中文翻译](http://www.ituring.com.cn/article/4063)

* [Study of an operating system: FreeRTOS](/embedded/FreeRTOS_Melot.pdf)
* [FreeRTOS 即时核心实用指南](/embedded/FreeRTOS-manual-zh.pdf)
* [FreeRTOS STM32F429 Driver API](https://hackmd.io/c/Sy9H-nKuV)
