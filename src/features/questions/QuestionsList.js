import React from 'react';
import PostCard from '../../helpers/PostCard';
import FilterQuestions from './FilterQuestions';

const QuestionsList = ({loading, questions, currentUser, deleteQuestion}) => {
    const handleQuestionsFetch = () => {
        if (loading) {
            return (
                <div className="flex justify-center">
                    <div className="loader"></div>
                </div>
            )
        } else if(questions) {
            const sortedQuestions = [...questions].sort((a,b) => b.created_at.localeCompare(a.created_at))
            return sortedQuestions.map(question => (
                <PostCard key={question.id} post={question} body={question.body.substring(0, 50) + ' ...'}
                    currentUser={currentUser} deleteQuestion={deleteQuestion}
                />
                ))
        } else {
            return <div>Nothing to display</div>
        }
    }
    return (
        <section className='posts-list mb-8'>
            <h1 className="font-bold text-2xl mb-3">All Questions</h1>
            <FilterQuestions/>
            {handleQuestionsFetch()}
        </section>
    );
}

export default QuestionsList;
