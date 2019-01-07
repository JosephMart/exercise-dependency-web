import unittest
import coverage

from flask import g
from flask.cli import FlaskGroup
from py2neo import Relationship

from project import create_app, get_db
from project.models import Textbook, Chapter


app = create_app()
cli = FlaskGroup(create_app=create_app)


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()


COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/config.py',
    ]
)
COV.start()


@cli.command()
def recreate_db():
    """Recreate or create the DB"""
    db = get_db()


@cli.command()
def test():
    """Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@cli.command()
def seed_db():
    """Seeds the database."""
    graph = get_db()

    # t = Textbook()
    results = list(Chapter.match(graph))
    app.logger.info(results)
    # t.title = "Hello Book"
    # t.uuid = 2
    # # t.gen_uuid()
    # c = Chapter()
    # c.name = "Chapter 1"
    # c.uuid = 123

    # t.chapters = [c]

    # graph.push(c)
    # graph.push(t)
    # graph.create(Relationship(c.__node__, 'CHAPTER_OF', t.__node__))


@cli.command()
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


if __name__ == '__main__':
    cli()
