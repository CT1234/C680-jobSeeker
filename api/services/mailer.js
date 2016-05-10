var schedule = require('node-schedule');

module.exports = function (jobData) {
    console.log(jobData);
    var nodemailer = require('nodemailer');
    console.log("Mailer Service Running");
    
    var userEmail = jobData.email,
        name = jobData.name,
        interviewDate = new Date(jobData.interviewDate),
        position = jobData.position,
        applied = jobData.applied;
        
    interviewDate.setHours(interviewDate.getHours() + 7);

    var smtpTransport = nodemailer.createTransport('CENSORED');

    function callTransporter(emailData) {
        smtpTransport.sendMail(emailData, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    function jobConfirmationEmail(email, name) {
        var mailOptions = {
            from: '"Job Seeker" <donotreply@jobseeker.com>',
            to: 'christufenkjian@gmail.com', email,
            subject: 'Job Confirmed ✔',
            text: 'Hi there, we are confirming your scheduled job application with ' + name,
            html: '<b>Hi there, we are confirming your scheduled job application with ' + name + ' </b>'
        };
        console.log('Sending Job Confirmation Mail');
        callTransporter(mailOptions);
    }

    function interviewReminderEmail(email, interviewDate, position, name) {
        var mailOptions = {
            from: '"Job Seeker" <donotreply@jobseeker.com>',
            to: 'christufenkjian@gmail.com', email,
            subject: 'Interview coming up! ✔',
            text: 'Hi there, this is just a remind that your interview is coming up for the ' + position + ' position at' + name,
            html: '<b>Hi there, this is just a reminder that your interview is coming up for the ' + position + ' position at' + name + '</b>'
        };
        var j = schedule.scheduleJob(interviewDate, function () {
            console.log('Sending interview reminder Email.');
            callTransporter(mailOptions);
        });
    }

    function followUpEmail(email, interviewDate, position, name) {
        var mailOptions = {
            from: '"Job Seeker" <donotreply@jobseeker.com>',
            to: 'christufenkjian@gmail.com', email,
            subject: 'Don\'t Forget the Follow-up! ✔',
            text: 'Hey there! Do not forget to send a follow-up email for the ' + position + ' position at ' + name,
            html: '<b>Hey there! Do not forget to send a follow-up email for the ' + position + ' position at ' + name + '.</b>'
        };
        interviewDate.setHours(interviewDate.getHours() + 24);

        var j = schedule.scheduleJob(interviewDate, function () {
            console.log('Sending follow-up letter Email.');
            callTransporter(mailOptions);
        });
    }

    jobConfirmationEmail(userEmail, name);
    
    if (applied) {
        console.log("Upcoming emails scheduled.");
        interviewReminderEmail(userEmail, interviewDate, position, name);
        followUpEmail(userEmail, interviewDate, position, name);
    }
}
