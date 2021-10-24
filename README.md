# How to migrate AWS SSM Parameters

# Introduction

This article contains steps to migrate AWS SSM Parameters from one region to another region. This guide is for Javascript | NodeJS developers who are familiar with 'aws-sdk`.

# Details

A few days ago, I and my colleague ran into a problem. Our project was going to be deployed for production for the first time. So, all of our development was done into `us-east-1` region but deployment for production was supposed to be done in `eu-west-2` region. For that, we had to move/replicate all of our resources to `eu-west-2`. My colleague is a smart DevOps guy. He managed to move everything (like, EC2, API Gateways, Lambdas, S3 buckets etc.) to other region in just few minutes. But with SSM parameters the story was different.

So we Googled the problem and we didn't find much. AWS actually doesn't provide any tool to migrate AWS SSM Parameters, so here we had to come up with our own solution. Which I am going to write down in 3 simple steps.

##

## Prerequisite:

- Familiarity with `aws-sdk`.
- Basic knowledge of NodeJS | Javascript.

# HERE WE GO !!!

## Step #1:

I am assuming that you are already working with AWS and have installed `aws-sdk`. So you need to run following command to fetch all the parameters in your current region:

`Λ: aws ssm get-parameters-by-path --path "/" --recursive`

**note: if you are using `SecureString` in your parameters, use additional flag `--with-decryption` in command above to export them correctly**

![](RackMultipart20200503-4-17emizf_html_d25a8372ef926c22.png)

## Step #2:

By running command in step #1, you will get a `JSON` formatted response like the following image:

![](RackMultipart20200503-4-17emizf_html_56d7a8fb1bfab015.png)

Just copy the response and paste it into a file (\*.txt file then rename it to \*.json). You have your JSON file with all the current parameters.

## Step #3:

Now, this is where Javascript comes in. I have written few lines of code that can do the job.

I published that code into a _git_ repository [here](#). Just clone that repository after cloning add your desired region here :

`const ssm = new AWS.SSM({`

`  apiVersion: '2014-11-06';,`

`  region: 'eu-west-2'; // add your destination region here.`

`});`

and your `json` file here:
`const { Parameters } = await require('<YOUR JSON FILE>.json');`

Then Install  **npm**  packages by running command `npm install` and run the script by command `npm start`

# AND THAT'S IT !!!

All of your parameters will start moving one by one. It will take some time depending on your number of parameters saved in \*_.json_ file.

Original Article: https://medium.com/@9.one.eight/how-to-migrate-aws-ssm-parameters-e60b0d136805
