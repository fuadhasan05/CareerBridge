export const jobsCreatedByPromise = email => {
    return fetch(`http://localhost:3000/job?email=${email}`)
    .then(res => res.json())
}