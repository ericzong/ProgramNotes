# 概述

## 什么是 TestNG?

TestNG表示下一代测试（NG，Next Generation的首字母）。

它被设计覆盖所有类别的测试：单元、功能、端到端、集成等。

TestNG提供了多个注解来标记不同层级的测试部件，以便控制测试流程、提供参数；并提供了大量断言方法来进行结果验证。

## 测试部件

TestNG包含几个等级的测试部件，包括：测试套（件）、测试、测试类、测试方法。

* 测试方法（test method）：使用@Test注解的Java方法；XML中使用&lt;methods&gt;配置。
* 测试类（test class）：至少包含一个TestNG注解的Java类；XML中用&lt;class&gt;配置；包含测试方法。
* 测试（test）：XML中用&lt;test&gt;配置；包含测试类。
* 测试套（suite）：XML中用&lt;suite&gt;配置。

> 说明：
>
> 我个人把测试行为大致分为这样几个等级：系统级、应用级、模块级、场景级、功能级、操作级……
>
> 它们跟TestNG的测试部件不是一一对应的，所以某个测试部件可以视具体情况对应某几个级别的测试行为（通常总是连续的级别）。比如：
>
> * 测试方法通常用于操作级或功能级（一般偏小而通用的功能）的测试；
> * 测试类通常用于功能级（较大的功能）或场景级的测试；
> * 测试通常用于场景级或模块级的测试；
> * 测试套通常用于模块级、应用级乃至系统级（常嵌套引用）的测试。

## 学习路线

官网：http://www.testng.org

> 官网文档本身就十分详细，适合学习入门。But...是全英文的，如果英文不好，看起来会有些费劲。不过，好在仅仅用了一页的篇幅就覆盖了TestNG几乎所有特性

## TestNG vs. JUnit

由于一些历史原因和自身定位的关系，JUnit存在一些缺点，通常较适合单元测试。

而较JUnit而言，TestNG更为强大，覆盖更多的测试种类，并且可以无缝执行用JUnit编写的用例，而且TestNG覆盖JUnit几乎所有的功能。

# 注解

TestNG有丰富的注解，其中@Test是最常用的，它用以标注测试方法。

另外，较为常用的注解还有@BeforeXXX和@AfterXXX。它们总是成对的，用以定义“前置”和“后置”的行为。

> 注意：当存在继承关系时，@Before注解的方法将按继承链自上而下的顺序执行，@After注解的方法与之相反。

其他的注解这里就不一一赘述了，下文中会具体用到大多数常用的注解。

# 使用配置

## 配置执行单元

TestNG测试套使用xml文件配置的方式提供，以定义执行一组用例，甚至是其他测试套（嵌套）。

TestNG为该xml文件定义有dtd，因此，xml配置文件的第一行总是这样：

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
```

测试套的所有内容都应该定义在&lt;suite&gt;标签内，并通常在其中用&lt;test&gt;标签定义多个测试，测试可以指定执行的类、包甚至是方法。

### 指定包

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
<suite name="测试套件" verbose="1" >
  <test name="简单测试">
    <packages>
      <package name="test.sample" />
      <package name="test.sample2" />
    </packages>
  </test>
</suite>
```

> 指定包下的所有测试类都将被执行，但不包含子包中的测试类。

### 指定类

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
<suite name="测试套件" verbose="1" >
  <test name="无名包类" >
    <classes>
       <class name="NoPackageTest" />
    </classes>
  </test>
 
  <test name="非无名包类">
    <classes>
      <class name="test.sample.ParameterSample"/>
      <class name="test.sample.ParameterTest"/>
    </classes>
  </test>
</suite>
```

> 类名应以全限定名给出。

### 指定方法

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
<suite name="测试套件" verbose="1" >
  <test name="简单测试">
    <classes>
      <class name="test.sample.FirstTest">
        <methods>
          <include name="testCase" />
        </methods>
      </class>
    </classes>
  </test>
</suite>
```

> 指定方法时，不仅指定了要执行的测试类，还指明了其中需要执行的测试方法。
>
> 可以看出，以上3种配置是层层细化的，可以灵活地配置各种级别的执行情况。

## 分组

@Test注解的groups属性可定义分组，并可在配置指定执行哪些分组。比如：

```java
public class GroupTest
{
    @Test(groups = {"异常"})
    public void testExceptionMethod() {...}

    @Test(groups = {"高"})
    public void testMethod() {...}
}
```

配置如下：

```xml
<suite name="测试套件" verbose="1" >
  <test name="简单测试">
    <groups>
      <run>
        <exclude name="异常"  />  <!-- name指定的是分组 -->
        <include name="高"  />  <!-- 是@Test的groups属性定义的 -->
      </run>
    </groups>
 
    <classes>
      <class name="test.sample.GroupTest"/>
    </classes>
  </test>
</suite>
```

> 分组是在测试方法上定义的，并在配置中指定是否执行。

### 使用正则表达式

上面指定的是分组的全名，我们也可以指定正则表达式来匹配分组名，比如：

```java
public class RegularExpressionTest
{
    @Test(groups = {"windows.test"})
    public void testWindowsOnly() {...}
    
    @Test(groups = {"linux.test"})
    public void testLinuxOnly() {...}
    
    @Test(groups = {"windows.functest"})
    public void testWindowsToo() {...}
}
```

配置中使用正则表达式如下：

```xml
<test name="正则表达式测试">
  <groups>
    <run>
      <include name="windows.*"/>
    </run>
  </groups>
 
  <classes>
    <class name="example.RegularExpressionTest"/>
  </classes>
</test>
```

### 部分组（Partial group）

上面的分组都是在方法级别定义的，但还可以在类级别定义分组，比如：

```java
@Test(groups = {"partial-group-test"})
public class All
{
    @Test(groups = {"method-group-test"})
    public void method1() {...}
    
    public void method2() {...}
}
```

> method2()是partial-group-test分组的一部分，因此称为“部分组”；而method1()除了属于其上定义的method-group-test分组外，也属于partial-group-test分组。

### 元分组（MetaGroup）——分组的分组

不仅可以指定执行测试类中定义的分组，甚至可以指定执行在配置文件中定义的分组。比如：

```xml
<test name="元分组测试">
  <groups>
    <define name="functest"> <!-- 定义分组 -->
      <include name="windows"/> <!-- 引用了测试类中的分组 -->
      <include name="linux"/>
    </define>
  
    <define name="all"> <!-- 定义分组 -->
      <include name="functest"/> <!-- 引用上面定义的分组 -->
      <include name="checkintest"/> <!-- 引用了测试类中的分组 -->
    </define>
  
    <run>
      <include name="all"/> <!-- 执行上面定义的分组 -->
    </run>
  </groups>
  
  <classes>
    <class name="test.sample.MetaGroupTest"/>
  </classes>
</test>
```

### 方法分组

```xml
<test name="方法分组测试">
  <classes>
    <class name="example.MethodGroupTest">
      <methods>
        <include name=".*enabledTestMethod.*"/>
        <exclude name=".*brokenTestMethod.*"/>
      </methods>
     </class>
  </classes>
</test>
```

> 个人认为，严格来说这不应该叫作分组，配置文件中并没有出现&lt;groups&gt;标签，但官方文档就是这样定义的，姑且这样叫吧。
>
> 注意，方法分组跟使用正则表达式匹配分组很像，但它们是不同的。首先，它们配置的标签不同；其次，方法分组的正则表达式匹配的是方法名，而不是分组名。