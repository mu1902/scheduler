'''接受Json格式净值清单，返回指标'''

if __name__ == '__main__':
    if len(sys.argv) >= 3:
        start = sys.argv[1]
        end = sys.argv[2]
        p = sys.argv[3]
    else:
        start = (datetime.date.today() -
                 datetime.timedelta(days=7)).strftime('%Y-%m-%d')
        end = datetime.date.today().strftime('%Y-%m-%d')
        p = "仙多"

    client = MongoClient('localhost', 27017)
    db = client['Fund']
    coll = db['net']

    # pro = coll.distinct('product')
    # res_list = []
    cond1 = {"product": p, "date": {"$gte": datetime.datetime.strptime(
        start, '%Y-%m-%d'), "$lte": datetime.datetime.strptime(end, '%Y-%m-%d')}}
    cond2 = {"product": p, "date": {"$lt": datetime.datetime.strptime(
        start, '%Y-%m-%d')}}
    data = []
    for n in coll.find(cond1, ['date', 'net']):
        n['date'] = n['date'].strftime('%Y-%m-%d')
        data.append(n)
    if len(data) > 0:
        pre = coll.find_one(
            cond2, ['date', 'net', 'before'], sort=[('date', -1)])
        if pre:
            pre['date'] = pre['date'].strftime('%Y-%m-%d')
            data.insert(0, pre)
        res = cal(data)
        res['product'] = p
        print(json.dumps(res))
